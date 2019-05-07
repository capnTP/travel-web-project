import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './style.less';

class Error extends Component {
  render() {
    const {
      props: { errMessage, error, closeError, slug, t },
    } = this;

    if (error) {
      return (
        <div className={slug ? styles.errorSlug : styles.error}>
          {slug ? (
            <React.Fragment>
              <span>{errMessage}</span>
              <Link to={`/discover/${slug}`}>{t('Click here to reload')}</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>{errMessage}</span>
              <button onClick={closeError} type="button">
                <span className="icon icon-close" />
              </button>
            </React.Fragment>
          )}
        </div>
      );
    }
    return null;
  }
}

Error.propTypes = {
  errMessage: PropTypes.string,
  error: PropTypes.bool,
  closeError: PropTypes.func,
  slug: PropTypes.string,
  t: PropTypes.func,
};

Error.defaultProps = {
  errMessage: '',
  error: false,
  closeError: () => {},
  slug: '',
  t: () => {},
};

export default Error;
