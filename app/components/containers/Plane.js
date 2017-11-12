import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchPlanesIfNeeded} from '../../actions/planes/planesActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import PlaneForm from '../presentation/PlaneForm';
import Navigation from '../presentation/Navigation';
import Typography from 'material-ui/Typography';

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
                <Typography style={{padding: '23px'}} type="headline">Planes</Typography>
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
        dispatch(fetchPlanesIfNeeded(type || 'current', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'plane'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
