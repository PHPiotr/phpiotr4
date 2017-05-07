import React from 'react';
import Auth from './Auth';
import {handleFocus, handleChange, addBookingIfNeeded, fetchHostelsIfNeeded} from '../../actions';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import HostelForm from '../presentation/HostelForm';
import Navigation from '../presentation/Navigation';

const Hostel = (props) => (
    <div>
        <Navigation {...props} />
        <HostelForm {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    hostel: state.bookings.hostel,
    hostelErrors: state.bookings.hostelErrors,
    hostelErrorMessage: state.bookings.hostelErrorMessage,
    hostelInserted: state.bookings.hostelInserted,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
});

const mapDispatchToProps = (dispatch) => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'hostel'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'hostel'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'hostel', 'hostels', getHeaders()));
    },
    fetchBookings(type, page) {
        dispatch(fetchHostelsIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Hostel));
