import React from 'react';
import Auth from './Auth';
import {fetchPlanesIfNeeded} from '../../actions/planes';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import PlaneForm from '../presentation/PlaneForm';
import Navigation from '../presentation/Navigation';

const Plane = (props) => (
    <div>
        <Navigation {...props} />
        <PlaneForm {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    plane: state.bookings.plane,
    planeErrors: state.bookings.planeErrors,
    planeErrorMessage: state.bookings.planeErrorMessage,
    planeInserted: state.bookings.planeInserted,
    bookingsLabel: 'planes',
    bookingLabel: 'plane',
});

const mapDispatchToProps = (dispatch) => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'plane'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'plane'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'plane', 'planes', getHeaders()));
    },
    fetchBookings(type, page) {
        dispatch(fetchPlanesIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Plane));
