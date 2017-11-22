import React, {Component} from 'react';
import * as bookingActions from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import BusForm from '../presentation/BusForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_BUS, EDIT_BUS} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Bus extends Component {

    componentDidMount() {
        this.props.init();
    }

    componentWillUnmount() {
        this.props.isAdding(false);
    }

    render() {
        return (
            <div>
                <BusForm {...this.props}/>
                <MessageBar
                    open={this.props.bus.isAdded}
                    message="Bus saved"
                    onRequestClose={this.props.onRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bus: state.bookings.bus,
    bookingsLabel: 'buses',
    bookingLabel: 'bus',
    pricePlaceholder: '0.00',
    isAdd: state.bookings.bus.isAdd,
});

const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
    init() {
        dispatch(bookingActions.setIsAdd({label: 'bus', isAdd: true}));
        if (id === 'new') {
            return dispatch(setAppBarTitle(NEW_BUS));
        }
        dispatch(bookingActions.getBookingIfNeeded('bus', 'buses', id))
            .then(({payload: {current}}) => {
                const bookingNumber = current.booking_number;
                dispatch(setAppBarTitle(`${EDIT_BUS}: ${bookingNumber}`));
            });
    },
    handleFocus(event) {
        dispatch(bookingActions.handleFocus(event, 'bus'));
    },
    handleChange(event) {
        dispatch(bookingActions.handleChange(event, 'bus'));
    },
    handleSubmit(event) {
        event.preventDefault();
        if (id === 'new') {
            dispatch(bookingActions.addBookingIfNeeded('bus', 'buses'));
        } else {
            dispatch(bookingActions.editBookingIfNeeded('bus', 'buses'));
        }
    },
    fetchBookings(type, page) {
        dispatch(bookingActions.getBookingsIfNeeded('bus', 'buses', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(bookingActions.setIsAdd({label: 'bus', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(bookingActions.setIsAdded({label: 'bus', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bus);
