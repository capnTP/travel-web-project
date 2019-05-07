import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../../src/components/Card';

import img from './infwar.gif';
import style from './style.less';

storiesOf('Card', module)
  .add('with content', () => (
    <Card content={() => <div className={style.content}>this is content</div>} />
  ))
  .add('with thumbnail', () => (
    <Card
      thumbnailUrl={img}
      thumbnailAlt="it's a gif!"
      content={() => <div className={style.content}>this is content</div>}
    />
  ))
  .add('with expansion', () => (
    <div className={style.container}>
      <Card
        content={() => <div className={style.content}>this is content</div>}
        showExpansion
        expansion={() => (
          <div className={style.content}>
            <h3>This is expansion</h3>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
          </div>
        )}
      />

      <Card
        thumbnailUrl={img}
        thumbnailAlt="it's a gif!"
        content={() => <div className={style.content}>this is content</div>}
        showExpansion
        expansion={() => (
          <div className={style.content}>
            <h3>This is expansion</h3>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
          </div>
        )}
      />
    </div>
  ));

storiesOf('Card/size', module)
  .add('with thumbnail', () => (
    <div className={style.container}>
      <div style={{ width: '500px' }}>
        <Card
          thumbnailUrl={img}
          thumbnailAlt="it's a gif!"
          content={() => <div className={style.content}>this is XS</div>}
        />
      </div>

      <div style={{ width: '1000px' }}>
        <Card
          thumbnailUrl={img}
          thumbnailAlt="it's a gif!"
          content={() => <div className={style.content}>{'this is > XS'}</div>}
        />
      </div>
    </div>
  ))
  .add('with expansion', () => (
    <div className={style.container}>
      <div style={{ width: '500px' }}>
        <Card
          thumbnailUrl={img}
          thumbnailAlt="it's a gif!"
          content={() => <div className={style.content}>this is content</div>}
          showExpansion
          expansion={() => (
            <div className={style.content}>
              <h3>This is expansion</h3>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
            </div>
          )}
        />
      </div>

      <div style={{ width: '1000px' }}>
        <Card
          thumbnailUrl={img}
          thumbnailAlt="it's a gif!"
          content={() => <div className={style.content}>this is content</div>}
          showExpansion
          expansion={() => (
            <div className={style.content}>
              <h3>This is expansion</h3>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
            </div>
          )}
        />
      </div>
    </div>
  ));
