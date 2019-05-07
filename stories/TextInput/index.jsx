import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from '../../src/components/TextInput';

import style from './style.less';

const inputs = [{ placeholder: 'Normal' }, { placeholder: 'Danger', hasError: true }];

storiesOf('TextInput', module)
  .add('normal', () => <div className={style.list}>{inputs.map(x => <TextInput {...x} />)}</div>)
  .add('hover', () => (
    <div className={style.list}>{inputs.map(x => <TextInput hover {...x} />)}</div>
  ))
  .add('focus', () => (
    <div className={style.list}>{inputs.map(x => <TextInput focus {...x} />)}</div>
  ))
  .add('disabled', () => (
    <div className={style.list}>{inputs.map(x => <TextInput disabled {...x} />)}</div>
  ));
