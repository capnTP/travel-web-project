// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { type TFunction } from 'react-i18next';

import Button from '../../../../components/Button';

import style from './style.less';

type Props = {
  list?: Array<{
    id: string,
    name: string,
  }>,
  onChange: (value: string[]) => void,
  selectedIds: string[],
  t: TFunction,
  title: string,
};

type State = {
  collapse: boolean,
  selectedIds: string[],
  selectedIdsFromProps: string[],
};

class Toggles extends Component<Props, State> {
  static defaultProps = {
    clearButtonLabel: '',
    collapse: false,
    toExpandLabel: 'Show',
    toCollapseLabel: 'Hide',
    list: [],
    onSelect() {},
    deSelectButtonLabel: 'All',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      collapse: false,
      selectedIds: props.selectedIds,
      selectedIdsFromProps: props.selectedIds,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.selectedIds !== prevState.selectedIdsFromProps) {
      return {
        selectedIds: nextProps.selectedIds,
        selectedIdsFromProps: nextProps.selectedIds,
      };
    }

    return prevState;
  }

  reset = () => {
    this.setState({ selectedIds: [] }, () => {
      this.props.onChange(this.state.selectedIds);
    });
  };

  render() {
    const { collapse, selectedIds } = this.state;
    const { t, title } = this.props;
    const list = this.props.list || [];

    return (
      <div className={style.toggles}>
        <div className={style.tool_bar}>
          <span className={style.title}>{title}</span>

          <button className={style.clear} onClick={this.reset} type="button">
            {t('filter.clear')}
          </button>

          <div className={classnames(style.collapse_toggle, { [style.collapse]: collapse })}>
            <button
              onClick={() => {
                this.setState(prevState => ({
                  collapse: !prevState.collapse,
                }));
              }}
              type="button"
            >
              <span className={style.text}>
                {collapse ? t('filter.showSection') : t('filter.hideSection')}
              </span>
              <span className={classnames('icon icon-arrow-up', style.icon)} />
            </button>
          </div>
        </div>

        {!collapse && (
          <Button
            className={style.toggle}
            colorType={selectedIds.length === 0 ? 'secondary' : ''}
            faded={selectedIds.length !== 0}
            onClick={this.reset}
          >
            {t('buttonLabelAll')}
          </Button>
        )}

        {list
          .filter(({ id }) => {
            if (!collapse) {
              return true;
            }

            return selectedIds.indexOf(id) > -1;
          })
          .map(({ name, id }) => (
            <Button
              key={id}
              className={style.toggle}
              colorType={selectedIds.indexOf(id) > -1 ? 'secondary' : ''}
              faded={selectedIds.indexOf(id) === -1}
              onClick={() => {
                this.setState(
                  prevState => {
                    const { selectedIds: ids } = prevState;

                    if (ids.indexOf(id) > -1) {
                      return { selectedIds: ids.filter(i => i !== id) };
                    }

                    ids.push(id);
                    return { selectedIds };
                  },
                  () => {
                    this.props.onChange(this.state.selectedIds);
                  },
                );
              }}
            >
              {name}
            </Button>
          ))}
      </div>
    );
  }
}

export default Toggles;
