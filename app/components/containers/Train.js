import React from 'react';
import Auth from './Auth';
import {handleFocus, handleChange, addBookingIfNeeded, fetchTrainsIfNeeded} from '../../actions';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import TrainForm from '../presentation/TrainForm';
import Navigation from '../presentation/Navigation';

const Train = (props) => (
    <div>
        <Navigation {...props} />
        <TrainForm {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    train: state.bookings.train,
    trainErrors: state.bookings.trainErrors,
    trainErrorMessage: state.bookings.trainErrorMessage,
    trainInserted: state.bookings.trainInserted,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
});

const mapDispatchToProps = (dispatch) => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'train'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'train'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'train', 'trains', getHeaders()));
    },
    fetchBookings(type, page) {
        dispatch(fetchTrainsIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Train));
