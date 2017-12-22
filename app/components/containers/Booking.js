import React, {Component, Fragment} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import * as bookingActions from '../../actions/booking/bookingActions';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import Auth from './Auth';
import BookingDeleteDialog from '../presentation/BookingDeleteDialog';

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
            return (
                <Fragment>
                    <WrappedComponent {...this.props} />
                    <MessageBar
                        open={this.props.isAdded}
                        message="Saved"
                        onClose={this.props.onClose}
                    />
                    <BookingDeleteDialog/>
                </Fragment>
            );
        }
    }

    hoistNonReactStatic(Booking, WrappedComponent);

    const mapStateToProps = state => ({
        [label]: state.bookings[label],
        pricePlaceholder: '0.00',
        isAdd: state.bookings[label].isAdd,
        isAdded: state.bookings[label].isAdded,
    });

    const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
        init() {
            dispatch(bookingActions.setIsAdd({label, isAdd: true}));
            if (id === 'new') {
                return dispatch(setAppBarTitle(WrappedComponent.newLabel));
            }
            dispatch(bookingActions.getBookingIfNeeded(label, labels, id))
                .then(() => {
                    dispatch(setAppBarTitle(WrappedComponent.editLabel));
                    dispatch(bookingActions.setCurrentBooking({label, labelPlural: labels, id}));
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

    return Auth(connect(mapStateToProps, mapDispatchToProps)(Booking));
};

export default booking;