// @flow
import React from 'react';

import FilterToggle from '../FilterToggle';

import style from './style.less';
import allImage from './all.jpg';

type CategoryType = {
  id: string,
  name: string,
  order: number,
  thumbnailUrl: string,
};

type Props = {
  activeKeys: Array<string>,
  categoryTypes: Array<CategoryType>,
  loading?: boolean,
  onSelectItem?: (value: string) => void,
};

class CategoryTypeFilter extends React.Component<Props> {
  static defaultProps = {
    loading: false,
    onSelectItem() {},
  };

  render() {
    const { activeKeys, categoryTypes, onSelectItem, loading } = this.props;

    return (
      <div className={style.category_type_filter}>
        {loading &&
          ['1', '2', '3', '4'].map(num => (
            <FilterToggle key={num} img="" itemKey={num} loading={loading} title="" />
          ))}

        {!loading && (
          <FilterToggle
            key="all"
            active={activeKeys.length === 0}
            img={allImage}
            itemKey=""
            onClick={onSelectItem}
            title="All"
          />
        )}

        {categoryTypes
          .sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }

            if (a.order > b.order) {
              return 1;
            }

            return 0;
          })
          .map(item => (
            <FilterToggle
              key={item.id}
              active={activeKeys.indexOf(item.id) > -1}
              img={item.thumbnailUrl}
              itemKey={item.id}
              onClick={onSelectItem}
              title={item.name}
            />
          ))}
      </div>
    );
  }
}

export default CategoryTypeFilter;
