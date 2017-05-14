import React, {Component} from 'react';
import Auth from './Auth';
import {setIsAdd} from '../../actions/index';
import {fetchTrainsIfNeeded} from '../../actions/trains';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import TrainForm from '../presentation/TrainForm';
import Navigation from '../presentation/Navigation';

class Train extends Component {
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
                <TrainForm {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    train: state.bookings.train,
    trainErrors: state.bookings.trainErrors,
    trainErrorMessage: state.bookings.trainErrorMessage,
    trainInserted: state.bookings.trainInserted,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
});

const mapDispatchToProps = (dispatch) => ({
    handleFocus(event) {
        dispatch(handleFocus(event, 'train'));
    },
    handleChange(event) {
        dispatch(handleChange(event, 'train'));
    },
    handleSubmit(event) {
        dispatch(addBookingIfNeeded(event, 'train', 'trains', getHeaders()));
    },
    fetchBookings(type, page) {
        dispatch(fetchTrainsIfNeeded(type || 'current', page || 1, getHeaders()));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'train'));
    }
});

export default Auth(connect(mapStateToProps, mapDispatchToProps)(Train));