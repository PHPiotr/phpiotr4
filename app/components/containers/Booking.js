import React, {Component, Fragment} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import * as bookingActions from '../../actions/booking/bookingActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import BookingDeleteDialog from '../presentation/BookingDeleteDialog';
import {LinearProgress} from 'material-ui/Progress';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const booking = (WrappedComponent) => {

    const label = WrappedComponent.bookingLabel;
    const labels = WrappedComponent.bookingsLabel;

    class Booking extends Component {
        static displayName = `Booking(${getDisplayName(WrappedComponent)})`;
        componentDidMount() {
            this.props.init();
        }
        componentWillUnmount() {
            this.props.terminate();
        }
        render() {
            if (this.props[label].isDeleting) {
                return <LinearProgress/>;
            }
            return (
                <Fragment>
                    <WrappedComponent {...this.props} />
                    <MessageBar
                        open={this.props.isAdded}
                        message="Saved"
                        onClose={this.props.onClose}
                    />
                    <MessageBar
                        open={!!this.props[label].message}
                        message={this.props[label].message}
                    />
                    <BookingDeleteDialog/>
                </Fragment>
            );
        }
    }

    hoistNonReactStatic(Booking, WrappedComponent);

    const mapStateToProps = (state) => {

        const current = state.bookings[label].current;

        return {
            [label]: {
                ...state.bookings[label],
                current: {
                    ...state.bookings[label].current,
                    price: current.price ? (parseFloat(current.price)).toFixed(2) : null,
                    departure_date: current.departure_date ? current.departure_date.substring(0, 10) : null,
                    return_departure_date: current.return_departure_date ? current.return_departure_date.substring(0, 10) : null,
                    checkin_date: current.checkin_date ? current.checkin_date.substring(0, 10) : null,
                    checkout_date: current.checkout_date ? current.checkout_date.substring(0, 10) : null,
                    departure_time: current.departure_time ? (current.departure_time.indexOf(':') === -1 ? current.departure_time.substring(0, 2) + ':' + current.departure_time.substring(2, current.departure_time.length) : current.departure_time) : null,
                    arrival_time: current.arrival_time ? (current.arrival_time.indexOf(':') === -1 ? current.arrival_time.substring(0, 2) + ':' + current.arrival_time.substring(2, current.arrival_time.length) : current.arrival_time) : null,
                    return_departure_time: current.return_departure_time ? (current.return_departure_time.indexOf(':') === -1 ? current.return_departure_time.substring(0, 2) + ':' + current.return_departure_time.substring(2, current.return_departure_time.length) : current.return_departure_time) : null,
                    return_arrival_time: current.return_arrival_time ? (current.return_arrival_time.indexOf(':') === -1 ? current.return_arrival_time.substring(0, 2) + ':' + current.return_arrival_time.substring(2, current.return_arrival_time.length) : current.return_arrival_time) : null,
                },
            },
            pricePlaceholder: '0.00',
            isAdd: state.bookings[label].isAdd,
            isAdded: state.bookings[label].isAdded,
        };
    };

    const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
        init() {
            dispatch(bookingActions.setIsAdd({label, isAdd: true}));
            if (id === 'new') {
                return dispatch(setAppBarTitle(WrappedComponent.newLabel));
            }
            dispatch(bookingActions.getBookingIfNeeded(label, labels, id))
                .then((response) => {
                    dispatch(setAppBarTitle(WrappedComponent.editLabel));
                    dispatch(bookingActions.setCurrentBooking({
                        label,
                        labelPlural: labels,
                        id: response.payload.current ? response.payload.current._id : null,
                    }));
                });
        },
        terminate() {
            dispatch(bookingActions.setIsAdd({label, isAdd: false}));
            dispatch(bookingActions.setCurrentBooking({label: '', labelPlural: '', id: null}));
        },
        handleFocus(event) {
            dispatch(bookingActions.handleFocus(event, label));
        },
        handleChange(event) {
            dispatch(bookingActions.handleChange(event, label));
        },
        handleSubmit(event) {
            event.preventDefault();
            if (id === 'new') {
                dispatch(bookingActions.addBookingIfNeeded(label, labels));
            } else {
                dispatch(bookingActions.editBookingIfNeeded(label, labels));
            }
        },
        fetchBookings(type, page) {
            dispatch(bookingActions.getBookingsIfNeeded(label, labels, type || '', page || 1));
        },
        isAdding(isAdd) {
            dispatch(bookingActions.setIsAdd({label, isAdd}));
        },
        setAppBarTitle(appBarTitle) {
            dispatch(setAppBarTitle(appBarTitle));
        },
        onClose() {
            dispatch(bookingActions.setIsAdded({label, isAdded: false}));
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Booking);
};

export default booking;