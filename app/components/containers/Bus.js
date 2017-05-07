import React from 'react';
import Auth from './Auth';
import {handleFocus, handleChange, addBookingIfNeeded, fetchBusesIfNeeded} from '../../actions';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import BusForm from '../presentation/BusForm';
import Navigation from '../presentation/Navigation';

const Bus = (props) => (
    <div>
        <Navigation {...props} />
        <BusForm {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    bus: state.bookings.bus,
    busErrors: state.bookings.busErrors,
    busErrorMessage: state.bookings.busErrorMessage,
    busInserted: state.bookings.busInserted,
    bookingsLabel: 'buses',
    bookingLabel: 'bus',
});

const mapDispatchToProps = (dispatch) => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'bus'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'bus'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'bus', 'buses', getHeaders()));
    },
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Bus));
