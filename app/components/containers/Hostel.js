import React, {Component} from 'react';
import {setIsAdd, setIsAdded, getBookingsIfNeeded} from '../../actions/booking/bookingActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import HostelForm from '../presentation/HostelForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_HOSTEL} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Hostel extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_HOSTEL);
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
                    message="Hostel added"
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

const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'hostel'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'hostel'));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(addBookingIfNeeded('hostel', 'hostels'));
    },
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('hostel', 'hostels', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd({label: 'hostel', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(setIsAdded({label: 'hostel', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Hostel);
