import React, {Component} from 'react';
import Auth from './Auth';
import {setIsAdd} from '../../actions/index';
import {fetchBusesIfNeeded} from '../../actions/buses';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import BusForm from '../presentation/BusForm';
import Navigation from '../presentation/Navigation';

class Bus extends Component {
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
                <BusForm {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    bus: state.bookings.bus,
    busErrors: state.bookings.busErrors,
    busErrorMessage: state.bookings.busErrorMessage,
    busInserted: state.bookings.busInserted,
    bookingsLabel: 'buses',
    bookingLabel: 'bus',
    pricePlaceholder: '0.00',
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
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'bus'));
    }
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Bus));
