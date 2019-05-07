import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List } from 'react-content-loader';

import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import CardHelper from '../../../../components/Card/helper';
import Select from '../../../../components/Select';

import style from './style.less';

class LanguageSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageId: props.languageId || '',
      saveDisabled: true,
      saving: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.languageId && !!props.languageId) {
      return {
        languageId: props.languageId,
      };
    }

    return null;
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value, saveDisabled: false });
  };

  render() {
    if (this.props.loading) {
      return (
        <Card
          content={({ width }) => {
            const size = CardHelper.getSize(width);

            return (
              <div
                className={classnames(style.language_and_currency_setting_component, style[size])}
              >
                <div className={style.title}>Language Setting</div>

                <List style={{ height: '100px', margin: '1em 0 0 0' }} />
              </div>
            );
          }}
        />
      );
    }

    return (
      <Card
        content={({ width }) => {
          const size = CardHelper.getSize(width);

          return (
            <div className={classnames(style.language_and_currency_setting_component, style[size])}>
              <div className={style.title}>Language Setting</div>

              <div className={style.description}>
                Set the language you wish to see when we send an email
              </div>

              <div className={style.input_group}>
                <Select
                  fullWidth={size === 'xs'}
                  name="languageId"
                  onChange={this.onInputChange}
                  value={this.state.languageId}
                >
                  <option disabled hidden value="">
                    No default language selected
                  </option>

                  {this.props.languages.map(x => (
                    <option key={x.id} value={x.id}>
                      {x.displayName}
                    </option>
                  ))}
                </Select>
              </div>

              <div className={style.action}>
                <Button
                  colorType="primary"
                  disabled={this.state.saveDisabled || this.state.saving}
                  fullWidth={size === 'xs'}
                  loading={this.state.saving}
                  onClick={async () => {
                    this.setState({ saving: true });
                    await this.props.onSave({
                      languageId: this.state.languageId,
                    });
                    this.setState({ saving: false, saveDisabled: true });
                  }}
                  outlined
                >
                  Save
                </Button>
              </div>
            </div>
          );
        }}
        loading={this.props.loading}
      />
    );
  }
}

LanguageSetting.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  languageId: PropTypes.string,
  loading: PropTypes.bool,
  onSave: PropTypes.func,
};

LanguageSetting.defaultProps = {
  languages: [],
  languageId: '',
  loading: false,
  onSave() {},
};

export default LanguageSetting;
