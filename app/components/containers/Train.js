import React, {Component} from 'react';
import * as bookingActions from '../../actions/booking/bookingActions';
import {connect} from 'react-redux';
import TrainForm from '../presentation/TrainForm';
import {setAppBarTitle} from '../../actions/app/appActions';
import {NEW_TRAIN, EDIT_TRAIN} from '../../constants';
import MessageBar from '../presentation/MessageBar';

class Train extends Component {

    componentDidMount() {
        this.props.init();
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
                    message="Train saved"
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

const mapDispatchToProps = (dispatch, {match: {params: {id}}}) => ({
    init() {
        dispatch(bookingActions.setIsAdd({label: 'train', isAdd: true}));
        if (id === 'new') {
            return dispatch(setAppBarTitle(NEW_TRAIN));
        }
        dispatch(bookingActions.getBookingIfNeeded('train', 'trains', id))
            .then(() => dispatch(setAppBarTitle(`${EDIT_TRAIN}: ${id}`)));
    },
    handleFocus(event) {
        dispatch(bookingActions.handleFocus(event, 'train'));
    },
    handleChange(event) {
        dispatch(bookingActions.handleChange(event, 'train'));
    },
    handleSubmit(event) {
        event.preventDefault();
        if (id === 'new') {
            dispatch(bookingActions.addBookingIfNeeded('train', 'trains'));
        } else {
            dispatch(bookingActions.editBookingIfNeeded('train', 'trains'));
        }
    },
    fetchBookings(type, page) {
        dispatch(bookingActions.getBookingsIfNeeded('train', 'trains', type || '', page || 1));
    },
    isAdding(isAdd) {
        dispatch(bookingActions.setIsAdd({label: 'train', isAdd}));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    onRequestClose() {
        dispatch(bookingActions.setIsAdded({label: 'train', isAdded: false}));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Train);
