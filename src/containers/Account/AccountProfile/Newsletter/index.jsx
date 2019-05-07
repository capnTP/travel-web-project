// @flow
import * as React from 'react';

import Box from '../../../../components/Box';
import Button from '../../../../components/Button';
import InputGroup from '../../../../components/Forms/InputGroup';
import TextInput from '../../../../components/TextInput';

import style from './style.less';

type FormData = {
  email: string,
  isSubscribeToPressReleases: boolean,
  isSubscribeToProductUpdates: boolean,
  isSubscribeToPromotionalNews: boolean,
};

type Props = {
  formData: ?FormData,
  onSubmit: FormData => Promise<any>,
};

type State = FormData & {
  emailErrorMessage: string,
  isSubmitDisabled: boolean,
  isSubmitting: boolean,
  isUnsubscribing: boolean,
  prevFormData: ?FormData,
};

class Newsletter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { formData: prevFormData } = props;

    let formData = {
      email: '',
      isSubscribeToPressReleases: false,
      isSubscribeToProductUpdates: false,
      isSubscribeToPromotionalNews: false,
    };

    if (prevFormData) {
      formData = {
        ...formData,
        ...prevFormData,
      };
    }

    this.state = {
      isSubmitDisabled: true,
      isSubmitting: false,
      isUnsubscribing: false,
      emailErrorMessage: '',
      ...formData,
      prevFormData,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.formData !== prevState.prevFormData) {
      return { ...nextProps.formData, prevFormData: nextProps.formData };
    }
    return prevState;
  }

  render() {
    const {
      email,
      isSubmitting,
      isSubscribeToPressReleases,
      isSubscribeToProductUpdates,
      isSubscribeToPromotionalNews,
      isUnsubscribing,
    } = this.state;
    const isSubscribed = !!this.props.formData;

    return (
      <Box className={style.Newsletter}>
        <h2>Email Notification Settings</h2>

        <p>Set your default email notification settings</p>

        <form
          className={style.content}
          onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();

            const isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
            if (!isEmailValid) {
              this.setState({ emailErrorMessage: 'Invalid email' });
              return;
            }

            this.setState({ isSubmitting: true, emailErrorMessage: '' });
            this.props
              .onSubmit({
                email,
                isSubscribeToPressReleases,
                isSubscribeToProductUpdates,
                isSubscribeToPromotionalNews,
              })
              .then(() => {
                this.setState({ isSubmitting: false, isSubmitDisabled: true });
              })
              .catch(() => {
                this.setState({ isSubmitting: false });
              });
          }}
        >
          <InputGroup errorMessage={this.state.emailErrorMessage} fullWidth label="Email Address">
            <TextInput
              autoComplete="on"
              hasError={!!this.state.emailErrorMessage}
              onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                this.setState({ email: event.currentTarget.value, isSubmitDisabled: false });
              }}
              type="email"
              value={email}
            />
          </InputGroup>

          <label htmlFor="promotional-news">
            <input
              checked={isSubscribeToPromotionalNews}
              id="promotional-news"
              onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                this.setState({
                  isSubscribeToPromotionalNews: event.currentTarget.checked,
                  isSubmitDisabled: false,
                });
              }}
              type="checkbox"
            />
            Received Promotional News
          </label>

          <label htmlFor="press-releases">
            <input
              checked={isSubscribeToPressReleases}
              id="press-releases"
              onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                this.setState({
                  isSubscribeToPressReleases: event.currentTarget.checked,
                  isSubmitDisabled: false,
                });
              }}
              type="checkbox"
            />
            Received Press Releases
          </label>

          <label htmlFor="product-updates">
            <input
              checked={isSubscribeToProductUpdates}
              id="product-updates"
              onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                this.setState({
                  isSubscribeToProductUpdates: event.currentTarget.checked,
                  isSubmitDisabled: false,
                });
              }}
              type="checkbox"
            />
            Received Product Updates
          </label>

          <div className={style.actions}>
            <Button
              colorType="primary"
              disabled={this.state.isSubmitDisabled || isSubmitting}
              loading={isSubmitting}
              outlined
              type="submit"
            >
              Save
            </Button>

            {isSubscribed && (
              <Button
                disabled={isUnsubscribing}
                loading={isUnsubscribing}
                onClick={(event: SyntheticEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  this.setState({ isUnsubscribing: true });
                  const data = {
                    email: '',
                    isSubscribeToPressReleases: false,
                    isSubscribeToProductUpdates: false,
                    isSubscribeToPromotionalNews: false,
                  };
                  return this.props
                    .onSubmit(data)
                    .then(() => {
                      this.setState({ ...data, isUnsubscribing: false, isSubmitDisabled: true });
                    })
                    .catch(() => {
                      this.setState({ isUnsubscribing: false });
                    });
                }}
                outlined
                type="button"
              >
                Unsubscribe
              </Button>
            )}
          </div>
        </form>
      </Box>
    );
  }
}

export default Newsletter;
