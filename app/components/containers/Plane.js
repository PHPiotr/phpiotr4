import React, {Component} from 'react';
import {setIsAdd, setIsAdded, getBookingsIfNeeded} from '../../actions/booking/bookingActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import PlaneForm from '../presentation/PlaneForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_PLANE} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Plane extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_PLANE);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return (
            <div>
                <PlaneForm {...this.props}/>
                <MessageBar
                    open={this.props.plane.isAdded}
                    message="Plane added"
                    onRequestClose={this.props.onRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plane: state.bookings.plane,
    bookingsLabel: 'planes',
    bookingLabel: 'plane',
    pricePlaceholder: '0.00',
    isAdd: state.bookings.plane.isAdd,
});

const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'plane'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'plane'));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(addBookingIfNeeded('plane', 'planes'));
    },
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('plane', 'planes', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'plane'));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(setIsAdded({label: 'plane', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
