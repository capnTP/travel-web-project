import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import querystring from 'query-string';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import countriesQuery from '../../../queries/countries/getCountries.gql';
import languagesQuery from '../../../queries/language/languages.gql';
import safeGet from '../../../helpers/safeGet';
import axios from '../../../helpers/axios';

import style from './style.less';
import helper from './helper';
import LanguageSetting from './LanguageSetting';
import EditInfo from './Info/Edit';
import ViewInfo from './Info/View';
import Newsletter from './Newsletter';

const getRule = ({ regex, errorMessage }) => ({
  test(value) {
    const valid = regex.test(value);

    if (!valid) {
      return errorMessage;
    }

    return '';
  },
});

const englishOnly = getRule({ regex: /^(|[A-Za-z ])*$/, errorMessage: 'Must be English only' });
const validPassportNumber = getRule({
  regex: /^(|[A-Za-z0-9])*$/,
  errorMessage: 'Invalid passport number',
});
const validPhoneNumber = getRule({
  regex: /^\+?[0-9_\- ]*$/,
  errorMessage: 'Invalid phone number',
});

const getFormDataFromProps = props => {
  const { profileQuery: ProfileQry } = props;

  if (!ProfileQry) {
    return {};
  }

  const { profile = {} } = ProfileQry;

  const { ...rest } = profile;

  return rest;
};

class AccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: [],
      formData: getFormDataFromProps(props),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const formData = getFormDataFromProps(props);

    return {
      formData: { ...formData, ...state.formData },
    };
  }

  handleInputChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [e.target.name]: e.target.value },
    });
  };

  validateForm = formData => {
    const formDataToValidate = {
      firstName: { value: formData.firstName, rules: [englishOnly] },
      lastName: { value: formData.lastName, rules: [englishOnly] },
      passport_number: { value: formData.passport_number, rules: [validPassportNumber] },
      phone: { value: formData.phone, rules: [validPhoneNumber] },
    };

    const validator = helper.getValidator();
    return validator.test(formDataToValidate);
  };

  updateUser = async () => {
    this.setState({ isSaving: true, formErrors: [] });

    const formErrors = this.validateForm(this.state.formData);

    if (formErrors.length > 0) {
      this.setState({ formErrors, isSaving: false });
      return;
    }

    const {
      firstName,
      lastName,
      countryId,
      birthday,
      passport_number,
      phone,
    } = this.state.formData;
    try {
      await this.props.updateUser({
        variables: {
          input: {
            first_name: firstName,
            last_name: lastName,
            country_id: countryId,
            birthday,
            passport_number,
            phone,
          },
        },
      });
    } catch (e) {
      // handle error
    } finally {
      this.setState({ isSaving: false });
      this.props.history.push({
        search: '',
      });
    }
  };

  goToEdit = () => {
    this.props.history.push({
      search: 'infoTab=edit',
    });
  };

  render() {
    const { formData, formErrors, isSaving } = this.state;
    const {
      countriesQuery: { countries = [] },
      languagesQuery: { languages = [] },
      profileQuery: { profile, loading },
    } = this.props;
    const { infoTab } = querystring.parse(this.props.location.search);

    if (!this.props.profileQuery.profile) {
      return null;
    }

    const isEdit = infoTab === 'edit';

    return (
      <div className={style.AccountProfile}>
        <Helmet>
          <title>My Profile | The Asia</title>
        </Helmet>

        <div className={style.info_wrapper}>
          {isEdit ? (
            <EditInfo
              countries={countries}
              formData={formData}
              formErrors={formErrors}
              handleInputChange={this.handleInputChange}
              isSaving={isSaving}
              updateUser={this.updateUser}
            />
          ) : (
            <ViewInfo countries={countries} formData={formData} goToEdit={this.goToEdit} />
          )}

          <LanguageSetting
            languageId={safeGet(() => profile.languageId)}
            languages={languages}
            loading={loading}
            onSave={({ languageId }) =>
              this.props.updateUser({
                variables: {
                  input: {
                    language_id: languageId,
                  },
                },
              })
            }
          />

          <Newsletter
            formData={profile.newsletter}
            onSubmit={async args => {
              const data = {
                email: args.email,
                newsletter_press: args.isSubscribeToPressReleases,
                newsletter_promotional: args.isSubscribeToPromotionalNews,
                newsletter_product_updates: args.isSubscribeToProductUpdates,
                user_id: profile.id,
              };

              let httpRequest = null;
              if (!profile.newsletter) {
                httpRequest = axios.post('/newsletters', data);
              } else if (!args.email) {
                httpRequest = axios.delete(`/newsletters/${profile.newsletter.id}`);
              } else {
                httpRequest = axios.patch(`/newsletters/${profile.newsletter.id}`, data);
              }

              await httpRequest;

              await this.props.profileQuery.refetch();
            }}
          />
        </div>
      </div>
    );
  }
}

AccountProfile.propTypes = {
  updateUser: PropTypes.func,
  history: PropTypes.shape({
    search: PropTypes.string,
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  countriesQuery: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.object),
  }),
  languagesQuery: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.object),
  }),
  profileQuery: PropTypes.shape({
    loading: PropTypes.bool,
    profile: PropTypes.object,
    refetch: PropTypes.func,
  }).isRequired,
};

AccountProfile.defaultProps = {
  updateUser() {},
  history: {
    push() {},
  },
  location: {},
  countriesQuery: {
    countries: [],
  },
  languagesQuery: {
    languages: [],
  },
};

export default compose(
  graphql(
    gql`
      query {
        profile {
          id

          birthday
          countryId
          email
          firstName
          languageId
          lastName
          newsletter {
            id
            email
            isSubscribeToPressReleases: newsletter_press
            isSubscribeToProductUpdates: newsletter_product_updates
            isSubscribeToPromotionalNews: newsletter_promotional
          }
          passport_number
          phone
        }
      }
    `,
    {
      name: 'profileQuery',
      options: {
        fetchPolicy: 'cache-and-network',
      },
    },
  ),
  graphql(countriesQuery, {
    name: 'countriesQuery',
    options: {
      fetchPolicy: 'cache-first',
    },
  }),
  graphql(languagesQuery, {
    name: 'languagesQuery',
    options: {
      fetchPolicy: 'cache-first',
    },
  }),
  graphql(
    gql`
      mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input) {
          id
        }
      }
    `,
    { name: 'updateUser' },
  ),
)(AccountProfile);
