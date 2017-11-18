import React, {Component} from 'react';
import {setIsAdd, setIsAdded, getBookingsIfNeeded} from '../../actions/booking/bookingActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import TrainForm from '../presentation/TrainForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_TRAIN} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Train extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_TRAIN);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return (
            <div>
                <TrainForm {...this.props}/>
                <MessageBar
                    open={this.props.train.isAdded}
                    message="Train added"
                    onRequestClose={this.props.onRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    train: state.bookings.train,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
    pricePlaceholder: '0.00',
    isAdd: state.bookings.train.isAdd,
});

const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'train'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'train'));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(addBookingIfNeeded('train', 'trains'));
    },
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('train', 'trains', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd({label: 'train', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(setIsAdded({label: 'train', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Train);
