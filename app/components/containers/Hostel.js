import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchHostelsIfNeeded} from '../../actions/hostels';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import HostelForm from '../presentation/HostelForm';
import Navigation from '../presentation/Navigation';
import Typography from 'material-ui/Typography';

class Hostel extends Component {
    componentWillMount() {
        this.props.isAdding(true);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Hostels</Typography>
                <Navigation {...this.props} />
                <HostelForm {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hostel: state.bookings.hostel,
    hostelErrors: state.bookings.hostelErrors,
    hostelErrorMessage: state.bookings.hostelErrorMessage,
    hostelInserted: state.bookings.hostelInserted,
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
        dispatch(fetchHostelsIfNeeded(type || 'current', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'hostel'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Hostel);
