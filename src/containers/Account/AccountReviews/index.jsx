import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import querystring from 'query-string';
import Popover from 'react-popover';
import { Helmet } from 'react-helmet';

import createReviewMutation from '../../../queries/review/createReview.gql';
import updateReviewMutation from '../../../queries/review/updateReview.gql';
import Tabs from '../Tabs';
import Overlay from '../Overlay';
import BookingListPlaceholder from '../BookingListPlaceholder';
import ListLoader from '../ListLoader';

import style from './style.less';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import rootQuery from './rootQuery.gql';

class AccountReviews extends React.Component {
  closeReviewPopOver = () => {
    const { tab } = querystring.parse(this.props.location.search);
    this.props.history.push({
      search: `?tab=${tab}`,
    });
  };

  refetchRootQuery = () => {
    this.props.data.refetch({
      where: {
        user_id: this.props.info.user.userId,
      },
    });
  };

  render() {
    const {
      data: { bookings = [], loading: loadingBookings },
    } = this.props;

    const { bookingId, reviewId, tab } = querystring.parse(this.props.location.search);

    const booking = bookings.find(b => b.id === bookingId);

    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 991;

    const showReviewPopupOnDesktop = (reviewId || !!booking) && isDesktop;

    const showReviewPopupOnMobile = !isDesktop && !!(reviewId || bookingId);

    /** display departed bookings
     or booking contains rejected reviews */
    const pendingBookings = bookings.filter(x => {
      if (!x.review && x.booking_status_id === '5') {
        return true;
      }

      if (x.review && x.review.status === 2) {
        return true;
      }

      return false;
    });

    const completedBookings = bookings.filter(x => {
      if (!x.review) {
        return false;
      }

      if (x.review.status === 2) {
        return false;
      }

      return true;
    });

    const selectedBooking =
      booking ||
      bookings.find(x => {
        if (!x.review) {
          return null;
        }

        return x.review.id === reviewId;
      });

    const reviewForm = selectedBooking && (
      <ReviewForm
        booking={selectedBooking}
        closeReviewPopOver={this.closeReviewPopOver}
        createReview={this.props.createReview}
        info={this.props.info}
        refetchRootQuery={this.refetchRootQuery}
        updateReview={this.props.updateReview}
      />
    );

    return (
      <div className={style.AccountReviews}>
        <Helmet>
          <title>My Reviews | The Asia</title>
        </Helmet>

        <Tabs
          activeTabId={tab}
          onTabChange={id => {
            this.props.history.push({
              search: `?tab=${id}`,
            });
          }}
        >
          <Tabs.Tab id="recent_bookings" title="Recent Bookings">
            {loadingBookings && <ListLoader />}

            {!loadingBookings && pendingBookings.length === 0 && (
              <BookingListPlaceholder title="There are currently no bookings" />
            )}

            {!loadingBookings && (
              <div className={style.card_list_wrapper}>
                <ul className={style.card_list}>
                  {pendingBookings.map(b => (
                    <Popover
                      key={b.id}
                      body={reviewForm}
                      isOpen={b.id === bookingId && showReviewPopupOnDesktop}
                      preferPlace="right"
                      tipSize={20}
                    >
                      <li>
                        <ReviewCard
                          booking={b}
                          onClickAddReview={() =>
                            this.props.history.push({
                              search: `?tab=recent_bookings&bookingId=${b.id}`,
                            })
                          }
                          onClickEditReview={() => {
                            this.props.history.push({
                              search: `?tab=recent_bookings&bookingId=${b.id}`,
                            });
                          }}
                        />
                      </li>
                    </Popover>
                  ))}
                </ul>
              </div>
            )}
          </Tabs.Tab>

          <Tabs.Tab id="completed_reviews" title="Completed Reviews">
            {loadingBookings && <ListLoader />}

            {!loadingBookings && completedBookings.length === 0 && (
              <BookingListPlaceholder title="You don't have any review yet, let's add one" />
            )}

            {!loadingBookings && (
              <div className={style.card_list_wrapper}>
                <ul className={style.card_list}>
                  {completedBookings.map(r => (
                    <li key={r.id}>
                      <Popover
                        key={r.id}
                        body={reviewForm}
                        isOpen={showReviewPopupOnDesktop && reviewId === r.review.id}
                        place="right"
                        preferPlace="right"
                        tipSize={20}
                      >
                        <ReviewCard
                          booking={r}
                          onClickAddReview={() =>
                            this.props.history.push({
                              search: `?tab=completed_reviews&reviewId=${r.review.id}`,
                            })
                          }
                          onClickEditReview={() => {
                            this.props.history.push({
                              search: `?tab=completed_reviews&reviewId=${r.review.id}`,
                            });
                          }}
                        />
                      </Popover>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Tabs.Tab>
        </Tabs>

        <Overlay isOpen={showReviewPopupOnMobile}>{reviewForm}</Overlay>
      </div>
    );
  }
}

AccountReviews.propTypes = {
  createReview: PropTypes.func,
  updateReview: PropTypes.func,
  info: PropTypes.object,
  data: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

AccountReviews.defaultProps = {
  location: {
    search: '',
  },
  createReview() {},
  updateReview() {},
  info: null,
  data: {
    bookings: [],
    loading: false,
  },
  history: {
    push() {},
  },
};

export default compose(
  graphql(rootQuery, {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: props.info.user.userId,
      },
    }),
  }),
  graphql(createReviewMutation, { name: 'createReview' }),
  graphql(updateReviewMutation, { name: 'updateReview' }),
)(AccountReviews);
