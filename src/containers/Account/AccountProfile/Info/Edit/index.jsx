import React from 'react';
import PropTypes from 'prop-types';

import style from '../../style.less';
import getSafe from '../../../../../helpers/safeGet';
import Button from '../../../../../components/Button';

import helper from './helper';

const days = helper.getDays();
const months = helper.getMonths();
const years = helper.getYears();

function EditInfo(props) {
  const {
    formData = {},
    formErrors = [],
    countries = [],
    isSaving = false,
    updateUser,
    handleInputChange,
  } = props;
  const firstNameInputErrors = formErrors.find(x => x.key === 'firstName');
  const lastNameInputErrors = formErrors.find(x => x.key === 'lastName');
  const passportInputErrors = formErrors.find(x => x.key === 'passport_number');
  const phoneInputErrors = formErrors.find(x => x.key === 'phone');

  return (
    <div className={style.edit_info_wrapper}>
      <div className={style.input_group}>
        <div className={style.uploadImg_wrapper}>
          <div className={style.text_wrapper}>
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
          <div>
            <strong>First Name</strong>
          </div>
          <div className={style.input_icon_wrapper}>
            <input
              name="firstName"
              onChange={handleInputChange}
              placeholder="First Name"
              value={formData.firstName}
            />
          </div>

          {firstNameInputErrors && (
            <div className={style.error_message}>{firstNameInputErrors.errors.join(', ')}</div>
          )}
        </div>

        <div className={style.input_group}>
          <div>
            <strong>Last Name</strong>
          </div>
          <div className={style.input_icon_wrapper}>
            <input
              name="lastName"
              onChange={handleInputChange}
              placeholder="Last Name"
              value={formData.lastName}
            />
          </div>

          {lastNameInputErrors && (
            <div className={style.error_message}>{lastNameInputErrors.errors.join(', ')}</div>
          )}
        </div>

        <div className={style.input_group}>
          <div>
            <strong>Nationality</strong>
          </div>
          <div className={style.input_icon_wrapper}>
            <div className={`${style.select_wrapper} ${style.full_width}`}>
              <select
                className={style.select_extra_large}
                name="countryId"
                onChange={handleInputChange}
                value={getSafe(
                  () => countries.find(country => country.id === formData.countryId).id,
                )}
              >
                <option />
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <i className="icon icon-arrow-down txt_secondary" />
            </div>
          </div>
        </div>

        <div className={style.input_group}>
          <div>
            <strong>Passport No.</strong>
          </div>
          <div className={style.input_icon_wrapper}>
            <input
              name="passport_number"
              onChange={handleInputChange}
              placeholder="5455 5455 5466"
              value={formData.passport_number}
            />
          </div>

          {passportInputErrors && (
            <div className={style.error_message}>{passportInputErrors.errors.join(', ')}</div>
          )}
        </div>

        <div className={style.input_group}>
          <div>
            <strong>Date of birth</strong>
            <span style={{ margin: '0 0 0 1em', color: 'darkgrey' }}>(D/M/YYYY)</span>
          </div>
          <div className={`${style.input_icon_wrapper} ${style.flex_nowrap}`}>
            <div className={style.select_wrapper}>
              <select
                className={style.select_medium}
                name="birthday"
                onChange={Event => {
                  const birthday = new Date(formData.birthday);
                  birthday.setDate(Event.target.value);
                  handleInputChange({
                    target: { value: birthday.toISOString(), name: 'birthday' },
                  });
                }}
                value={
                  formData && formData.birthday ? new Date(formData.birthday).getUTCDate() : null
                }
              >
                {days.map(i => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <i className="icon icon-arrow-down txt_secondary" />
            </div>

            <div className={style.select_wrapper}>
              <select
                className={style.select_medium}
                name="birthday"
                onChange={Event => {
                  const birthday = new Date(formData.birthday);
                  birthday.setMonth(parseInt(Event.target.value, 10) - 1);
                  handleInputChange({
                    target: { value: birthday.toISOString(), name: 'birthday' },
                  });
                }}
                value={
                  formData && formData.birthday
                    ? new Date(formData.birthday).getUTCMonth() + 1
                    : null
                }
              >
                {months.map(i => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <i className="icon icon-arrow-down txt_secondary" />
            </div>

            <div className={style.select_wrapper}>
              <select
                className={style.select_medium}
                name="birthday"
                onChange={Event => {
                  const birthday = new Date(formData.birthday);
                  birthday.setFullYear(Event.target.value);
                  handleInputChange({
                    target: { value: birthday.toISOString(), name: 'birthday' },
                  });
                }}
                value={
                  formData && formData.birthday
                    ? new Date(formData.birthday).getUTCFullYear()
                    : null
                }
              >
                {years.map(i => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <i className="icon icon-arrow-down txt_secondary" />
            </div>
          </div>
        </div>

        <div className={style.input_group}>
          <div>
            <strong>Phone Number</strong>
          </div>

          <div className={style.input_icon_wrapper}>
            <input
              name="phone"
              onChange={handleInputChange}
              placeholder="Phone Number"
              value={formData.phone}
            />
          </div>

          {phoneInputErrors && (
            <div className={style.error_message}>{phoneInputErrors.errors.join(', ')}</div>
          )}
        </div>
      </div>

      <Button colorType="warning" fullWidth loading={isSaving} onClick={updateUser}>
        Save
      </Button>
    </div>
  );
}

EditInfo.propTypes = {
  formData: PropTypes.object,
  formErrors: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isSaving: PropTypes.bool,
  updateUser: PropTypes.func,
  handleInputChange: PropTypes.func,
};

EditInfo.defaultProps = {
  formData: {},
  formErrors: [],
  countries: [],
  isSaving: false,
  updateUser() {},
  handleInputChange() {},
};

export default EditInfo;
