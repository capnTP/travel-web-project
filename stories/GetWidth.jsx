import React from 'react';
import { storiesOf } from '@storybook/react';
import GetWidth from '../src/components/GetWidth';

const style = { border: '1px solid black', padding: '1em' };

storiesOf('GetWidth', module)
  .add('full width', () => (
    <GetWidth>
      {({ width }) => (
        <div style={style}>
          <strong>{width}</strong>
        </div>
      )}
    </GetWidth>
  ))
  .add('half width', () => (
    <div style={{ width: '50%' }}>
      <GetWidth>
        {({ width }) => (
          <div style={style}>
            <strong>{width}</strong>
          </div>
        )}
      </GetWidth>
    </div>
  ));
