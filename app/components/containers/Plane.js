import React, {Component} from 'react';
import * as bookingActions from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import PlaneForm from '../presentation/PlaneForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_PLANE, EDIT_PLANE} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Plane extends Component {

    componentDidMount() {
        this.props.init();
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
                    message="Plane saved"
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

const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
    init() {
        dispatch(bookingActions.setIsAdd({label: 'plane', isAdd: true}));
        if (id === 'new') {
            return dispatch(setAppBarTitle(NEW_PLANE));
        }
        dispatch(bookingActions.getBookingIfNeeded('plane', 'planes', id))
            .then(() => dispatch(setAppBarTitle(`${EDIT_PLANE}: ${id}`)));
    },
    handleFocus(event) {
        dispatch(bookingActions.handleFocus(event, 'plane'));
    },
    handleChange(event) {
        dispatch(bookingActions.handleChange(event, 'plane'));
    },
    handleSubmit(event) {
        event.preventDefault();
        if (id === 'new') {
            dispatch(bookingActions.addBookingIfNeeded('plane', 'planes'));
        } else {
            dispatch(bookingActions.editBookingIfNeeded('plane', 'planes'));
        }
    },
    fetchBookings(type, page) {
        dispatch(bookingActions.getBookingsIfNeeded('plane', 'planes', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(bookingActions.setIsAdd({label: 'plane', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(bookingActions.setIsAdded({label: 'plane', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
