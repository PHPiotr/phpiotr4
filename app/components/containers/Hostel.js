import React, {Component} from 'react';
import * as bookingActions from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import HostelForm from '../presentation/HostelForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {EDIT_HOSTEL, NEW_HOSTEL} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Hostel extends Component {

    componentDidMount() {
        this.props.init();
    }

    componentWillUnmount() {
        this.props.isAdding(false);
    }

    render() {
        return (
            <div>
                <HostelForm {...this.props}/>
                <MessageBar
                    open={this.props.hostel.isAdded}
                    message="Hostel saved"
                    onRequestClose={this.props.onRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hostel: state.bookings.hostel,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
    pricePlaceholder: '0.00',
    isAdd: state.bookings.hostel.isAdd,
});

const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
    init() {
        dispatch(bookingActions.setIsAdd({label: 'hostel', isAdd: true}));
        if (id === 'new') {
            return dispatch(setAppBarTitle(NEW_HOSTEL));
        }
        dispatch(bookingActions.getBookingIfNeeded('hostel', 'hostels', id))
            .then(({payload: {current}}) => {
                const bookingNumber = current.booking_number;
                dispatch(setAppBarTitle(`${EDIT_HOSTEL}: ${bookingNumber}`));
            });
    },
    handleFocus(event) {
        dispatch(bookingActions.handleFocus(event, 'hostel'));
    },
    handleChange(event) {
        dispatch(bookingActions.handleChange(event, 'hostel'));
    },
    handleSubmit(event) {
        event.preventDefault();
        if (id === 'new') {
            dispatch(bookingActions.addBookingIfNeeded('hostel', 'hostels'));
        } else {
            dispatch(bookingActions.editBookingIfNeeded('hostel', 'hostels'));
        }
    },
    fetchBookings(type, page) {
        dispatch(bookingActions.getBookingsIfNeeded('hostel', 'hostels', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(bookingActions.setIsAdd({label: 'hostel', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(bookingActions.setIsAdded({label: 'hostel', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Hostel);
