import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import style from '../../style.less';
import getSafe from '../../../../../helpers/safeGet';
import Button from '../../../../../components/Button';

function ViewInfo(props) {
  const { formData = {}, countries = [], goToEdit } = props;
  return (
    <div className={`${style.edit_info_wrapper} ${style.viewInfo}`}>
      <div className={style.input_group}>
        <div className={style.uploadImg_wrapper}>
          <div className={style.text_wrapper}>
            <strong>
              {formData.firstName} {formData.lastName}
            </strong>
            <div className={style.email_txt}>{formData.email}</div>
          </div>
        </div>
      </div>

      <div className={style.bold_txt}>
        <b>The following information is used in our Quick Checkout process only </b>
        (optional)
      </div>

      <div className={style.fields_wrapper}>
        <div className={style.input_group}>
          <div className={style.view_text}>
            <strong>Nationality</strong>
            <b>
              {getSafe(() => countries.find(country => country.id === formData.countryId).name)}
            </b>
          </div>
        </div>

        <div className={style.input_group}>
          <div className={style.view_text}>
            <strong>Passport No.</strong>
            <b>{formData.passport_number}</b>
          </div>
        </div>

        <div className={style.input_group}>
          <div className={style.view_text}>
            <strong>Date of birth</strong>
            <b>{formData.birthday ? moment.utc(formData.birthday).format('DD MMM YYYY') : ''}</b>
          </div>
        </div>

        <div className={style.input_group}>
          <div className={style.view_text}>
            <strong>Phone Number</strong>
            <b>{formData.phone}</b>
          </div>
        </div>
      </div>
      <hr />
      <Button colorType="warning" fullWidth onClick={goToEdit} outlined>
        Edit This Information
      </Button>
    </div>
  );
}

ViewInfo.propTypes = {
  formData: PropTypes.object,
  countries: PropTypes.arrayOf(PropTypes.object),
  goToEdit: PropTypes.func,
};

ViewInfo.defaultProps = {
  formData: {},
  countries: [],
  goToEdit() {},
};

export default ViewInfo;
