import React from 'react';
import { storiesOf } from '@storybook/react';

import InputGroup from '../../../src/components/Forms/InputGroup';
import TextInput from '../../../src/components/TextInput';
import Select from '../../../src/components/Select';

import style from './style.less';

import '../../../src/assets/icons/style.css';

storiesOf('Form/InputGroup', module)
  .add('normal', () => (
    <div className={style.container}>
      <InputGroup label="Input">
        <TextInput />
      </InputGroup>

      <InputGroup errorMessage="This is error" label="Input with error">
        <TextInput hasError />
      </InputGroup>

      <InputGroup label="Input">
        <Select>
          <option>Test</option>
        </Select>
      </InputGroup>

      <InputGroup errorMessage="This is error" label="Input with error">
        <Select hasError>
          <option>Test</option>
        </Select>
      </InputGroup>
    </div>
  ))
  .add('full width', () => (
    <div>
      <InputGroup fullWidth label="Input">
        <TextInput />
      </InputGroup>

      <InputGroup errorMessage="This is error" fullWidth label="Input with error">
        <TextInput hasError />
      </InputGroup>

      <InputGroup fullWidth label="Input">
        <Select>
          <option>Test</option>
        </Select>
      </InputGroup>

      <InputGroup errorMessage="This is error" fullWidth label="Input with error">
        <Select hasError>
          <option>Test</option>
        </Select>
      </InputGroup>
    </div>
  ));
