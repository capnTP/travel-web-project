// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Link, withRouter, type RouterHistory, type Location } from 'react-router-dom';
import className from 'classnames';
import { translate, type TFunction } from 'react-i18next';
import gql from 'graphql-tag';

import searchTours from '../../helpers/searchTours';
import compose from '../../helpers/compose';
import debounce from '../../helpers/debounce';

import textHighlight from './textHighlight';
import style from './style.less';

type Props = {
  destinationsQuery: {
    countryDestinations: ?(Object[]),
  },
  history: RouterHistory,
  location: Location,
  storeSearch: ({ variables: { query: string } }) => Promise<boolean>,
  t: TFunction,
};

type State = {
  active: string,
  input: string,
  isChange: boolean,
  isFocus: boolean,
  path: string,
  searchResult: Array<{
    id: string,
    name: string,
    slug: string,
    stats: Object,
    type: string,
  }>,
};

class SearchBar extends React.Component<Props, State> {
  state = {
    isFocus: false,
    isChange: false,
    searchResult: [],
    input: '',
    active: '0',
    path: '',
  };

  storeSearch = debounce(
    arg =>
      this.props.storeSearch(arg).catch(error => {
        console.error('error::SearchBar::storeSearch', error); // eslint-disable-line no-console
      }),
    1000,
    false,
  );

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  onClickSearch = () => {
    if (this.state.input.length > 0) {
      this.props.history.push(`/discover/?query=${this.state.input}`, {
        inputSearch: this.state.input,
      });
      this.setState({
        isFocus: false,
      });
    }
  };

  static getDerivedStateFromProps = (nextProps: Props, prevState: State) => {
    const location = nextProps.location;
    const { pathname, state } = location;
    const inputSearch = state ? state.input || '' : '';

    if ((prevState.input.length === 0 && !prevState.isFocus) || prevState.path !== pathname) {
      return {
        ...prevState,
        input: inputSearch,
        path: pathname,
      };
    }
    return {
      ...prevState,
      path: pathname,
    };
  };

  handleClick = (event: MouseEvent) => {
    if (
      this.autocomplete &&
      event.target instanceof Node &&
      !this.autocomplete.contains(event.target)
    ) {
      this.setState({
        isFocus: false,
        searchResult: [],
        active: '0',
      });
    }
  };

  autocomplete: ?HTMLElement;

  render() {
    const { active, isChange, isFocus } = this.state;
    const { destinationsQuery, t } = this.props;
    const destinations = destinationsQuery.countryDestinations || [];

    return (
      <div
        ref={node => {
          this.autocomplete = node;
        }}
        className={className(style.middle, {
          [style.mobile_search]: this.state.isFocus,
        })}
      >
        <div className={style.form_group}>
          <input
            className="search_open"
            onChange={({ target: { value } }) => {
              this.setState(
                {
                  isChange: value.length > 0,
                  input: value,
                },
                () => {
                  const code = 'en';
                  const type = 'all';

                  this.storeSearch({ variables: { query: value } });

                  searchTours(value, type, code).then(data => {
                    if (data && data.error) {
                      this.setState({
                        searchResult: [],
                      });
                    } else {
                      this.setState({
                        searchResult: data || [],
                      });
                    }
                  });
                },
              );
            }}
            onFocus={() => {
              this.setState({
                isFocus: true,
              });
            }}
            placeholder={t('search placeholder')}
            value={this.state.input}
          />
          <button
            className={className(style.btn_search, {
              [style.is_focus]: this.state.isFocus,
            })}
            onClick={this.onClickSearch}
            type="button"
          >
            <span className="icon icon-search" />
          </button>

          <button
            className={style.btn_close}
            onClick={() => {
              if (isFocus) {
                this.setState({
                  isFocus: false,
                  input: '',
                  searchResult: [],
                  active: '0',
                });
              }
            }}
            type="button"
          >
            <span className="icon icon-microphone" />
            <span className="icon icon-close" />
          </button>
        </div>

        {isFocus && (
          <div className={style.autocomplete}>
            {isChange && (
              <div className={style.auto_searches}>
                <ul>
                  {this.state.searchResult.map(
                    ({ id, name, slug, type, stats: { total: { total: allList = '' } = {} } }) => (
                      <li key={id}>
                        <Link
                          target="_self"
                          to={{
                            pathname: `/${type}/${slug}/`,
                            state: { inputSearch: type === 'city' ? name : '' },
                          }}
                        >
                          <span className="icon icon-search" />
                          <span>{textHighlight(name, this.state.input)}</span>
                          <span>{allList}</span>
                          <span className="icon icon-arrow-right" />
                        </Link>
                      </li>
                    ),
                  )}
                  <li>
                    {this.state.searchResult.length > 0 ? (
                      <Link
                        target="_self"
                        to={{
                          pathname: '/discover',
                          search: `query=${this.state.input}`,
                        }}
                      >
                        <span>{`See More Result for "${this.state.input}"`}</span>
                      </Link>
                    ) : (
                      <span>No results found</span>
                    )}
                  </li>
                </ul>
              </div>
            )}

            {!isChange && (
              <React.Fragment>
                <div className={style.auto_left}>
                  <ul>
                    {destinations.map(({ id, name }) => (
                      <li
                        key={id}
                        className={className({
                          [style.active]: id === this.state.active,
                        })}
                        onClick={() => {
                          this.setState({ active: id });
                        }}
                        role="presentation"
                      >
                        <span className="search_category">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={style.auto_right}>
                  <ul>
                    {destinations
                      .filter(item => this.state.active === item.id)
                      .map(({ cities = [], data: topSearches = [] }) => {
                        if (active === '0') {
                          return topSearches.map(({ id, keyword, url }) => (
                            <li key={id}>
                              <Link target="_self" to={`/${url}`}>
                                <span className="icon icon-search" />
                                <span>{keyword}</span>
                              </Link>
                            </li>
                          ));
                        }

                        return cities.map(val => {
                          const {
                            name,
                            slug,
                            toursCount: { total },
                          } = val;

                          return (
                            <li key={name} className={style.list}>
                              <Link className="search_link" target="_self" to={`/city/${slug}/`}>
                                <span className="icon icon-search" />
                                <span>{name}</span>
                                <span>{total > 0 ? total : ''}</span>
                              </Link>
                            </li>
                          );
                        });
                      })}
                  </ul>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(
    gql`
      query {
        countryDestinations {
          id

          cities {
            name
            slug
            toursCount {
              total
              tours
              activities
              transportation
            }
          }

          data {
            id
            keyword
            url
            order
          }

          name
        }
      }
    `,
    {
      name: 'destinationsQuery',
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  ),
  graphql(
    gql`
      mutation storeSearch($query: String!) {
        storeSearch(query: $query)
      }
    `,
    { name: 'storeSearch' },
  ),
  translate('common'),
  SearchBar,
);
