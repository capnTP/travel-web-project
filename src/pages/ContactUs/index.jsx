// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { translate, type TFunction } from 'react-i18next';
import gql from 'graphql-tag';
import { Grid, Col, Row } from 'react-flexbox-grid/dist/react-flexbox-grid';

import SeoHelper from '../../components/SeoHelper';
import compose from '../../helpers/compose';
import { emailValidator, requiredValidator, validateField } from '../../helpers/validateField';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Box from '../../components/Box';
import InputGroup from '../../components/Forms/InputGroup';

import style from './style.less';

type Props = {
  contactUsSubmit: Object => Promise<any>,
  info: { locale: string },
  t: TFunction,
};

type State = {
  contactBookingNumber: string,
  contactBookingNumberErrorMessage: string,
  contactCategories: string,
  contactEmail: string,
  contactEmailErrorMessage: string,
  contactFirstName: string,
  contactFirstNameErrorMessage: string,
  contactLanguage: string,
  contactLanguageErrorMessage: string,
  contactLastName: string,
  contactLastNameErrorMessage: string,
  contactMessage: string,
  contactMessageErrorMessage: string,
  isDisabledSubmit: boolean,
  isSubmitting: boolean,
};

const defaultState = {
  contactFirstName: '',
  contactFirstNameErrorMessage: '',
  contactLastName: '',
  contactLastNameErrorMessage: '',
  contactEmail: '',
  contactEmailErrorMessage: '',
  contactLanguage: '',
  contactLanguageErrorMessage: '',
  contactBookingNumber: '',
  contactBookingNumberErrorMessage: '',
  contactCategories: 'general',
  contactMessage: '',
  contactMessageErrorMessage: '',
  isDisabledSubmit: true,
  isSubmitting: false,
};

class ContactUs extends React.Component<Props, State> {
  state = {
    ...defaultState,
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isDisabledSubmit: false,
    });
  };

  submitInfo = () => {
    this.setState({
      contactEmailErrorMessage: '',
      contactMessageErrorMessage: '',
      contactLastNameErrorMessage: '',
      contactFirstNameErrorMessage: '',
      contactBookingNumberErrorMessage: '',
      isSubmitting: true,
    });
    const contactFirstNameErrorMessage = validateField({
      rules: [requiredValidator],
      value: this.state.contactFirstName,
    }).join(', ');
    const contactLastNameErrorMessage = validateField({
      rules: [requiredValidator],
      value: this.state.contactLastName,
    }).join(', ');
    const contactEmailErrorMessage = validateField({
      rules: [requiredValidator, emailValidator],
      value: this.state.contactEmail,
    }).join(', ');
    const contactBookingNumberErrorMessage = validateField({
      rules: [requiredValidator],
      value: this.state.contactBookingNumber,
    }).join(', ');
    const contactMessageErrorMessage = validateField({
      rules: [requiredValidator],
      value: this.state.contactMessage,
    }).join(', ');
    if (
      contactEmailErrorMessage ||
      contactMessageErrorMessage ||
      contactLastNameErrorMessage ||
      contactFirstNameErrorMessage ||
      contactBookingNumberErrorMessage
    ) {
      this.setState({
        contactEmailErrorMessage,
        contactMessageErrorMessage,
        contactLastNameErrorMessage,
        contactFirstNameErrorMessage,
        contactBookingNumberErrorMessage,
        isSubmitting: false,
      });
      return;
    }
    this.props
      .contactUsSubmit({
        variables: {
          input: {
            name: this.state.contactFirstName,
            lastName: this.state.contactLastName,
            email: this.state.contactEmail,
            language: this.state.contactLanguage,
            bookingNumber: this.state.contactBookingNumber,
            categoryId: this.state.contactCategories,
            message: this.state.contactMessage,
          },
        },
      })
      .then(res => {
        this.setState({ isSubmitting: false });
        if (res.data.contactUs) {
          // eslint-disable-next-line no-alert
          alert("Thankyou for you're message \n we will get back to you as soon as possible.");
          this.setState({
            ...defaultState,
          });
        }
      })
      .catch(() => {
        this.setState({ isSubmitting: false });
        // eslint-disable-next-line no-alert
        alert('Something went wrong! \n Please try again.');
      });
  };

  render() {
    const {
      t,
      info: { locale },
    } = this.props;

    let contactCategories = t('categories');
    if (typeof contactCategories === 'string') {
      contactCategories = [];
    }

    return (
      <Grid className={style.contact_us} fluid>
        <SeoHelper
          description={t('seo.description')}
          isPublished
          keywords={t('seo.description')}
          locale={locale}
          ogType="website"
          title={t('seo.title')}
        />

        <Row>
          <Col lgOffset={2}>
            <h1> {t('heading.title')}</h1>
          </Col>
        </Row>

        <Row>
          <Col lg={5} lgOffset={2} md={8} sm={12}>
            <Box noBorder>
              <Row>
                <Col md={6} sm={12}>
                  <InputGroup
                    errorMessage={this.state.contactFirstNameErrorMessage}
                    fullWidth
                    label={t('content.input.firstName.title')}
                  >
                    <TextInput
                      hasError={!!this.state.contactFirstNameErrorMessage}
                      name="contactFirstName"
                      onChange={this.handleChange}
                      placeholder={t('content.input.firstName.placeholder')}
                      value={this.state.contactFirstName}
                    />
                  </InputGroup>
                </Col>

                <Col md={6} sm={12}>
                  <InputGroup
                    errorMessage={this.state.contactLastNameErrorMessage}
                    fullWidth
                    label={t('content.input.lastName.title')}
                  >
                    <TextInput
                      hasError={!!this.state.contactLastNameErrorMessage}
                      name="contactLastName"
                      onChange={this.handleChange}
                      placeholder={t('content.input.lastName.placeholder')}
                      value={this.state.contactLastName}
                    />
                  </InputGroup>
                </Col>

                <Col md={6} sm={12}>
                  <InputGroup
                    errorMessage={this.state.contactEmailErrorMessage}
                    fullWidth
                    label={t('content.input.email.title')}
                  >
                    <TextInput
                      hasError={!!this.state.contactEmailErrorMessage}
                      name="contactEmail"
                      onChange={this.handleChange}
                      placeholder={t('content.input.email.placeholder')}
                      value={this.state.contactEmail}
                    />
                  </InputGroup>
                </Col>

                <Col md={6} sm={12}>
                  <InputGroup
                    errorMessage={this.state.contactBookingNumberErrorMessage}
                    fullWidth
                    label={t('content.input.bookingNumber.title')}
                  >
                    <TextInput
                      hasError={!!this.state.contactBookingNumberErrorMessage}
                      name="contactBookingNumber"
                      onChange={this.handleChange}
                      placeholder={t('content.input.bookingNumber.placeholder')}
                      value={this.state.contactBookingNumber}
                    />
                  </InputGroup>
                </Col>

                <Col md={6} sm={12}>
                  <InputGroup fullWidth label={t('content.input.categories.title')}>
                    <Select
                      name="contactCategories"
                      onChange={this.handleChange}
                      value={this.state.contactCategories}
                    >
                      <option disabled hidden selected>
                        -
                      </option>

                      {contactCategories
                        .sort((a, b) => {
                          if (a.name > b.name) return 1;
                          if (a.name < b.name) return -1;
                          return 0;
                        })
                        .map(item => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </Select>
                  </InputGroup>
                </Col>

                <Col lg={12}>
                  <InputGroup
                    errorMessage={this.state.contactMessageErrorMessage}
                    fullWidth
                    label={t('content.input.message.title')}
                  >
                    <TextArea
                      hasError={!!this.state.contactMessageErrorMessage}
                      name="contactMessage"
                      onChange={this.handleChange}
                      placeholder={t('content.input.message.placeholder')}
                      title={t('content.input.message.title')}
                      value={this.state.contactMessage}
                    />
                  </InputGroup>
                </Col>

                <Col lg={12}>
                  <Button
                    colorType="primary"
                    disabled={this.state.isDisabledSubmit}
                    loading={this.state.isSubmitting}
                    onClick={this.submitInfo}
                    outlined
                  >
                    {t('content.input.send')}
                  </Button>
                </Col>
              </Row>
            </Box>
          </Col>

          <Col lg={3} md={4} sm={12}>
            <Box>
              <h2>{t('content.infoBox.heading')}</h2>
              <p> {t('content.infoBox.days')} </p>
              <p>{t('content.infoBox.time')}</p>
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default compose(
  graphql(
    gql`
      mutation contactUs($input: ContactInput!) {
        contactUs(input: $input)
      }
    `,
    { name: 'contactUsSubmit' },
  ),
  translate('contact-us'),
  ContactUs,
);
