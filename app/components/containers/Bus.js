import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchBusesIfNeeded} from '../../actions/buses/busesActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import BusForm from '../presentation/BusForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_BUS} from '../../constants';

class Bus extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_BUS);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return <BusForm {...this.props}/>;
    }
}

const mapStateToProps = state => ({
    bus: state.bookings.bus,
    busErrors: state.bookings.busErrors,
    busErrorMessage: state.bookings.busErrorMessage,
    busInserted: state.bookings.busInserted,
    bookingsLabel: 'buses',
    bookingLabel: 'bus',
    pricePlaceholder: '0.00',
    isAdd: state.bookings.bus.isAdd,
});

const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'bus'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'bus'));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(addBookingIfNeeded('bus', 'buses'));
    },
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'bus'));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bus);
