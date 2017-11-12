import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchBusesIfNeeded} from '../../actions/buses/busesActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import BusForm from '../presentation/BusForm';
import Navigation from '../presentation/Navigation';
import Typography from 'material-ui/Typography';

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
                <Typography style={{padding: '23px'}} type="headline">Buses</Typography>
                <Navigation {...this.props} />
                <BusForm {...this.props} />
            </div>
        );
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
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'bus'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bus);
