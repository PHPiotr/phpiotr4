import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import * as bookingActions from '../../actions/booking/bookingActions';
import {setAppBarTitle} from '../../actions/app/appActions';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const booking = (WrappedComponent) => {

    const label = WrappedComponent.bookingLabel;
    const labels = WrappedComponent.bookingsLabel;
    const newLabel = WrappedComponent.newLabel;
    const editLabel = WrappedComponent.editLabel;

    class Booking extends Component {
        componentDidMount() {
            this.props.init();
        }
        componentWillUnmount() {
            this.props.isAdding(false);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    Booking.displayName = `Booking(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Booking, WrappedComponent);

    const mapStateToProps = state => ({
        [label]: state.bookings[label],
        pricePlaceholder: '0.00',
        isAdd: state.bookings[label].isAdd,
    });

    const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
        init() {
            dispatch(bookingActions.setIsAdd({label, isAdd: true}));
            if (id === 'new') {
                return dispatch(setAppBarTitle(newLabel));
            }
            dispatch(bookingActions.getBookingIfNeeded(label, labels, id))
                .then(() => dispatch(setAppBarTitle(`${editLabel}: ${id}`)));
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
        onRequestClose() {
            dispatch(bookingActions.setIsAdded({label, isAdded: false}));
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Booking);
};

export default booking;