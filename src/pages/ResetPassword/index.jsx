// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import qs from 'query-string';
import classnames from 'classnames';
import { Link, type Location } from 'react-router-dom';

import InputGroup from '../../components/Forms/InputGroup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import compose from '../../helpers/compose';

import style from './style.less';

type Props = {
  location: Location,
  resetPassword: (arg: {
    variables: {
      accessToken: string,
      password: string,
    },
  }) => {
    data: {
      updatePassword: boolean,
    },
  },
};

type State = {
  confirmPassword: string,
  confirmPasswordError: string,
  isSubmitting: boolean,
  newPassword: string,
  newPasswordError: string,
  status: '' | 'error' | 'done',
  submitDisabled: boolean,
};

class ResetPasswordPage extends React.Component<Props, State> {
  state = {
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    submitDisabled: true,
    isSubmitting: false,
    status: '',
  };

  componentDidMount() {
    if (this.newPasswordInput) {
      this.newPasswordInput.focus();
    }
  }

  submit = async () => {
    const { newPassword, confirmPassword } = this.state;
    let newPasswordError = '';
    let confirmPasswordError = '';

    if (!newPassword) {
      newPasswordError = 'Required';
    }

    if (!confirmPassword) {
      confirmPasswordError = 'Required';
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      confirmPasswordError = 'Password mismatch';
    }

    if (newPasswordError || confirmPasswordError) {
      this.setState({ newPasswordError, confirmPasswordError });
      return;
    }

    this.setState({ isSubmitting: true });

    const { location } = this.props;
    const query = qs.parse(location.search);
    const accessToken = String(query.access_token);

    try {
      await this.props.resetPassword({
        variables: { password: newPassword, accessToken },
      });

      this.setState({ status: 'done' });
    } catch (error) {
      this.setState({ status: 'error' });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  newPasswordInput: ?HTMLInputElement;

  render() {
    const {
      status,
      isSubmitting,
      newPassword,
      newPasswordError,
      confirmPassword,
      confirmPasswordError,
      submitDisabled,
    } = this.state;

    return (
      <div className={style.reset_password_page}>
        <div
          className={classnames(style.container, {
            [style.done]: status === 'done',
            [style.error]: status === 'error',
          })}
        >
          {status === '' && (
            <React.Fragment>
              <div className={style.description}>
                <h2>Reset Your Password</h2>

                <p>
                  Enter a new password for your account. We highly recommend you create a unique
                  password - one that you don’t use for any other websites.
                </p>
              </div>

              <div className={style.form}>
                <InputGroup errorMessage={newPasswordError} fullWidth label="New password">
                  <TextInput
                    componentRef={node => {
                      this.newPasswordInput = node;
                    }}
                    hasError={!!newPasswordError}
                    id="new_password"
                    name="email"
                    onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                      this.setState({
                        newPassword: event.currentTarget.value,
                        submitDisabled: false,
                      });
                    }}
                    onKeyPress={(event: SyntheticKeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        this.submit();
                      }
                    }}
                    type="password"
                    value={newPassword}
                  />
                </InputGroup>

                <InputGroup errorMessage={confirmPasswordError} fullWidth label="Confirm password">
                  <TextInput
                    hasError={!!confirmPasswordError}
                    id="confirm_password"
                    name="email"
                    onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                      this.setState({
                        confirmPassword: event.currentTarget.value,
                        submitDisabled: false,
                      });
                    }}
                    onKeyPress={(event: SyntheticKeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        this.submit();
                      }
                    }}
                    type="password"
                    value={confirmPassword}
                  />
                </InputGroup>

                <Button
                  colorType="primary"
                  disabled={submitDisabled}
                  loading={isSubmitting}
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Reset password
                </Button>
              </div>
            </React.Fragment>
          )}

          {status === 'done' && (
            <React.Fragment>
              <h2>Your password has been reset</h2>

              <p>Your password has been updated. What would you like to do next?</p>

              <Link to="/?popup=signing&from=home">
                <Button colorType="primary" fullWidth>
                  Login to Your Account
                </Button>
              </Link>

              <Link to="/">
                <Button colorType="primary" fullWidth outlined style={{ margin: '1em 0 0 0' }}>
                  Return to Homepage
                </Button>
              </Link>
            </React.Fragment>
          )}

          {status === 'error' && (
            <React.Fragment>
              <h2>Oh snap!</h2>

              <p>
                Something is wrong and we can not reset your password.
                <br /> To help you solve this problem, please contact our lovely customer support.
              </p>

              <Link target="_self" to="/contact-us/">
                <Button colorType="primary" fullWidth>
                  Contact customer support
                </Button>
              </Link>

              <Link to="/">
                <Button colorType="primary" fullWidth outlined style={{ margin: '1em 0 0 0' }}>
                  Return to Homepage
                </Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(
    gql`
      mutation resetPassword($accessToken: String!, $password: String!) {
        updatePassword(accessToken: $accessToken, password: $password)
      }
    `,
    {
      name: 'resetPassword',
    },
  ),
  ResetPasswordPage,
);
