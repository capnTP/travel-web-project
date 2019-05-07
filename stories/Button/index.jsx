import React from 'react';
import { storiesOf } from '@storybook/react';
import classnames from 'classnames';

import Button from '../../src/components/Button';

import style from './style.less';

const buttons = [
  { props: { colorType: '', text: 'Normal' }, children: 'Normal' },
  { props: { colorType: 'primary' }, children: 'Primary' },
  { props: { colorType: 'secondary' }, children: 'Secondary' },
  { props: { colorType: 'danger' }, children: 'Danger' },
  { props: { colorType: 'warning' }, children: 'Warning' },
  { props: { colorType: '', outlined: true }, children: 'Normal outlined' },
  { props: { colorType: 'primary', outlined: true }, children: 'Primary outlined' },
  { props: { colorType: 'secondary', outlined: true }, children: 'Secondary outlined' },
  { props: { colorType: 'danger', outlined: true }, children: 'Danger outlined' },
  { props: { colorType: 'warning', outlined: true }, children: 'Warning outlined' },
];

storiesOf('Button', module)
  .add('normal', () => (
    <div className={style.container}>
      {buttons.map(b => <Button {...b.props}>{b.children}</Button>)}
    </div>
  ))
  .add('disabled', () => (
    <div className={style.container}>
      {buttons.map(b => (
        <Button {...b.props} disabled>
          {b.children}
        </Button>
      ))}
    </div>
  ))
  .add('loading', () => (
    <div className={style.container}>
      {buttons.map(b => (
        <Button {...b.props} loading>
          {b.children}
        </Button>
      ))}
    </div>
  ))
  .add('full width', () => (
    <div className={classnames(style.container, style.flex_column)}>
      {buttons.map(b => (
        <Button {...b.props} fullWidth>
          {b.children}
        </Button>
      ))}
    </div>
  ))
  .add('faded', () => (
    <div className={style.container}>
      {buttons.map(b => (
        <Button {...b.props} faded>
          {b.children}
        </Button>
      ))}
    </div>
  ))
  .add('no border', () => (
    <div className={style.container}>
      {buttons.map(b => (
        <Button {...b.props} noBorder>
          {b.children}
        </Button>
      ))}
    </div>
  ));
