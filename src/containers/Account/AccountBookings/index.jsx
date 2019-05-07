import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import querystring from 'query-string';
import Popover from 'react-popover';
import { Helmet } from 'react-helmet';

import bookingsQuery from '../../../queries/booking/bookings.gql';
import Tabs from '../Tabs';
import BookingListPlaceholder from '../BookingListPlaceholder';
import ListLoader from '../ListLoader';

import style from './style.less';
import BookingCard from './BookingCard';
import BookingDetail from './BookingDetail';

class AccountBookings extends React.Component {
  state = {
    fullBookingIds: [],
  };

  render() {
    const {
      bookingsQuery: { bookings = [], loading: loadingBookings },
    } = this.props;

    const pendingBookings = bookings.filter(b => b.booking_status_id === '1');
    const upcomingBookings = bookings.filter(b => b.booking_status_id === '2');
    const departedBookings = bookings.filter(b => b.booking_status_id === '5');
    const cancelledBookings = bookings.filter(b => b.booking_status_id === '6');

    const { bookingId, tab } = querystring.parse(this.props.location.search);
    const viewingBooking = bookings.find(b => b.id === bookingId);

    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 991;

    const bookingDetailComponent = (
      <BookingDetail
        booking={viewingBooking}
        onClose={() => {
          this.props.history.push(`?tab=${tab}`);
        }}
        onViewFullBooking={id => {
          const { fullBookingIds = [] } = this.state;
          fullBookingIds.push(id);
          this.setState({ fullBookingIds });

          // close popup immediately on mobile
          if (!isDesktop) {
            this.props.history.push(`?tab=${tab}`);
          }
        }}
      />
    );

    const bookingDetailPopover = viewingBooking && (
      <div style={{ width: '300px' }}>{bookingDetailComponent}</div>
    );

    if (loadingBookings) {
      return (
        <div className={style.AccountBookings}>
          <Tabs>
            <Tabs.Tab id="Pending" title="Pending Bookings">
              <ListLoader />
            </Tabs.Tab>

            <Tabs.Tab id="Upcoming" title="Upcoming Bookings">
              <ListLoader />
            </Tabs.Tab>

            <Tabs.Tab id="departed" title="Departed Bookings">
              <ListLoader />
            </Tabs.Tab>

            <Tabs.Tab id="cancelled" title="Cancelled">
              <ListLoader />
            </Tabs.Tab>
          </Tabs>
        </div>
      );
    }

    return (
      <div className={style.AccountBookings}>
        <Helmet>
          <title>My Bookings | The Asia</title>
        </Helmet>

        <Tabs>
          <Tabs.Tab id="Pending" title="Pending Bookings">
            {pendingBookings.length === 0 && (
              <BookingListPlaceholder title="There are currently no pending bookings" />
            )}

            {pendingBookings && (
              <ul className={style.booking_list}>
                {pendingBookings.map(b => (
                  <li key={b.id}>
                    <Popover
                      key={b.id}
                      body={bookingDetailPopover}
                      isOpen={b.id === bookingId && isDesktop}
                      preferPlace="right"
                      tipSize={20}
                    >
                      <div className={style.booking_card_wrapper}>
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onHideFullDetail={id => {
                            const { fullBookingIds = [] } = this.state;
                            this.setState({
                              fullBookingIds: fullBookingIds.filter(x => x !== id),
                            });
                          }}
                          onView={() => {
                            this.props.history.push(`?bookingId=${b.id}&tab=pending`);
                          }}
                          showFullDetail={this.state.fullBookingIds.indexOf(b.id) > -1}
                        />
                      </div>
                    </Popover>
                  </li>
                ))}
              </ul>
            )}
          </Tabs.Tab>

          <Tabs.Tab id="Upcoming" title="Upcoming Bookings">
            {upcomingBookings.length === 0 && (
              <BookingListPlaceholder title="There are currently no upcoming bookings" />
            )}

            {upcomingBookings && (
              <ul className={style.booking_list}>
                {upcomingBookings.map(b => (
                  <li key={b.id}>
                    <Popover
                      key={b.id}
                      body={bookingDetailPopover}
                      isOpen={b.id === bookingId && isDesktop}
                      preferPlace="right"
                      tipSize={20}
                    >
                      <div className={style.booking_card_wrapper}>
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onHideFullDetail={id => {
                            const { fullBookingIds = [] } = this.state;
                            this.setState({
                              fullBookingIds: fullBookingIds.filter(x => x !== id),
                            });
                          }}
                          onView={() => {
                            this.props.history.push(`?bookingId=${b.id}&tab=upcoming`);
                          }}
                          showFullDetail={this.state.fullBookingIds.indexOf(b.id) > -1}
                        />
                      </div>
                    </Popover>
                  </li>
                ))}
              </ul>
            )}
          </Tabs.Tab>

          <Tabs.Tab id="departed" title="Departed Bookings">
            {departedBookings.length === 0 && (
              <BookingListPlaceholder title="There are currently no departed bookings" />
            )}

            {departedBookings.length > 0 && (
              <ul className={style.booking_list}>
                {departedBookings.map(b => (
                  <li key={b.id}>
                    <Popover
                      key={b.id}
                      body={bookingDetailPopover}
                      isOpen={b.id === bookingId && isDesktop}
                      preferPlace="right"
                      tipSize={20}
                    >
                      <div className={style.booking_card_wrapper}>
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onHideFullDetail={id => {
                            const { fullBookingIds = [] } = this.state;
                            this.setState({
                              fullBookingIds: fullBookingIds.filter(x => x !== id),
                            });
                          }}
                          onView={() => {
                            this.props.history.push(`?bookingId=${b.id}&tab=departed`);
                          }}
                          showFullDetail={this.state.fullBookingIds.indexOf(b.id) > -1}
                        />
                      </div>
                    </Popover>
                  </li>
                ))}
              </ul>
            )}
          </Tabs.Tab>

          <Tabs.Tab id="cancelled" title="Cancelled">
            {cancelledBookings.length === 0 && (
              <BookingListPlaceholder title="There are currently no cancelled bookings" />
            )}

            {cancelledBookings.length > 0 && (
              <ul className={style.booking_list}>
                {cancelledBookings.map(b => (
                  <li key={b.id}>
                    <Popover
                      key={b.id}
                      body={bookingDetailPopover}
                      isOpen={b.id === bookingId && isDesktop}
                      preferPlace="right"
                      tipSize={20}
                    >
                      <div className={style.booking_card_wrapper}>
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onHideFullDetail={id => {
                            const { fullBookingIds = [] } = this.state;
                            this.setState({
                              fullBookingIds: fullBookingIds.filter(x => x !== id),
                            });
                          }}
                          onView={() => {
                            this.props.history.push(`?bookingId=${b.id}&tab=cancelled`);
                          }}
                          showFullDetail={this.state.fullBookingIds.indexOf(b.id) > -1}
                        />
                      </div>
                    </Popover>
                  </li>
                ))}
              </ul>
            )}
          </Tabs.Tab>
        </Tabs>

        {viewingBooking && !isDesktop && (
          <div className={style.booking_detail_wrapper_mobile}>{bookingDetailComponent}</div>
        )}
      </div>
    );
  }
}

AccountBookings.propTypes = {
  bookingsQuery: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

AccountBookings.defaultProps = {
  bookingsQuery: {
    bookings: [],
    loading: false,
  },
  history: {
    push() {},
  },
  location: {
    search: '',
  },
};

export default compose(
  graphql(bookingsQuery, {
    name: 'bookingsQuery',
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        limit: 100,
        where: {
          user_id: props.info.user.userId,
        },
      },
    }),
  }),
)(AccountBookings);
