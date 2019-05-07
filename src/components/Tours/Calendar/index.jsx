import React from 'react';
// import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';

import style from './style.less';

const Calendar = () => (
  <div className={style.date_container}>
    <DayPickerSingleDateController
      date={null}
      focused={false}
      numberOfMonths={1}
      onDateChange={() => {}}
    />
  </div>
);

export default Calendar;
