import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchPlanesIfNeeded} from '../../actions/planes';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import PlaneForm from '../presentation/PlaneForm';
import Navigation from '../presentation/Navigation';

class Plane extends Component {
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
                <PlaneForm {...this.props} />
            </div>
        );
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
});

const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'plane'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'plane'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'plane', 'planes'));
    },
    fetchBookings(type, page) {
        dispatch(fetchPlanesIfNeeded(type || 'current', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'plane'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
