import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import style from './style.less';

// const Share = ({ textHidden }) => (
//   <span
//     role="button"
//     aria-hidden
//     className={style.share}>
//     {textHidden ? null : <span>Share</span>}
//     <span className="fas fa-share-alt" />
//   </span>
// );

// Share.propTypes = {
//   textHidden: PropTypes.bool,
//   // fill: PropTypes.bool,
// };

// Share.defaultProps = {
//   textHidden: false,
//   // fill: false,
// };

export class Share extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className={style.share}>
        <FacebookShareButton url={url}>
          <span className={`icon icon-facebook ${style.fbIcon}`} />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <span className={`icon icon-twitter ${style.twitterIcon}`} />
        </TwitterShareButton>
      </div>
    );
  }
}

Share.propTypes = {
  // textHidden: PropTypes.bool,
  url: PropTypes.string,
  // fill: PropTypes.bool,
};

Share.defaultProps = {
  url: '',
  // fill: false,
};

export default Share;
