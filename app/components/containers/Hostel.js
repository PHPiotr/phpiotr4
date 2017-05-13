import React, {Component} from 'react';
import Auth from './Auth';
import {setIsAdd} from '../../actions/index';
import {fetchHostelsIfNeeded} from '../../actions/hostels';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import HostelForm from '../presentation/HostelForm';
import Navigation from '../presentation/Navigation';

class Hostel extends Component {
    componentWillMount() {
        this.props.isAdding(true);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return (
            <div>
                <Navigation {...this.props} />
                <HostelForm {...this.props} />
            </div>
        );
    }
}

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
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'hostel'));
    }
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Hostel));
