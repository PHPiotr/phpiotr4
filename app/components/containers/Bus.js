import React, {Component} from 'react';
import {setIsAdd, setIsAdded} from '../../actions/booking/bookingActions';
import {getBookingsIfNeeded} from '../../actions/booking/bookingActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import BusForm from '../presentation/BusForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_BUS} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Bus extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_BUS);
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
                    message="Bus added"
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
        dispatch(getBookingsIfNeeded('bus', 'buses', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd({label: 'bus', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(setIsAdded({label: 'bus', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bus);
