import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchPlanesIfNeeded} from '../../actions/planes/planesActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import PlaneForm from '../presentation/PlaneForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_PLANE} from '../../constants';

class Plane extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_PLANE);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return <PlaneForm {...this.props}/>;
    }
}

const mapStateToProps = state => ({
    plane: state.bookings.plane,
    planeErrors: state.bookings.planeErrors,
    planeErrorMessage: state.bookings.planeErrorMessage,
    planeInserted: state.bookings.planeInserted,
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
        dispatch(fetchPlanesIfNeeded(type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'plane'));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
