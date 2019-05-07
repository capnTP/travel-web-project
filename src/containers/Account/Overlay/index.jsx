import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

import style from './style.less';

const Overlay = ({ children, isOpen, closeModal }) =>
  isOpen ? (
    <AriaModal titleId="demo-two-title" underlayClickExits={false} verticallyCenter>
      <div className={style.container}>
        <div className={style.header}>
          <button onClick={closeModal} type="button">
            <span className="fas fa-times" />
          </button>
        </div>
        <div className={style.body}>{children}</div>
      </div>
    </AriaModal>
  ) : null;

Overlay.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

Overlay.defaultProps = {
  children: '',
  isOpen: false,
  closeModal: () => {},
};

export default Overlay;
