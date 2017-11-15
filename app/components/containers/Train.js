import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchTrainsIfNeeded} from '../../actions/trains/trainsActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import TrainForm from '../presentation/TrainForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_TRAIN} from '../../constants';

class Train extends Component {
    componentWillMount() {
        this.props.isAdding(true);
        this.props.setAppBarTitle(NEW_TRAIN);
    }
    componentWillUnmount() {
        this.props.isAdding(false);
    }
    render() {
        return <TrainForm {...this.props}/>;
    }
}

const mapStateToProps = state => ({
    train: state.bookings.train,
    trainErrors: state.bookings.trainErrors,
    trainErrorMessage: state.bookings.trainErrorMessage,
    trainInserted: state.bookings.trainInserted,
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
        dispatch(fetchTrainsIfNeeded(type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'train'));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Train);
