import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../src/components/Button';
import ButtonGroup from '../../src/components/ButtonGroup';

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

storiesOf('ButtonGroup', module).add('normal', () => (
  <ButtonGroup>{buttons.map(b => <Button {...b.props}>{b.children}</Button>)}</ButtonGroup>
));
