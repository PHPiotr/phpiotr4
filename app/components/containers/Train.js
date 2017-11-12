import React, {Component} from 'react';
import {setIsAdd} from '../../actions/index';
import {fetchTrainsIfNeeded} from '../../actions/trains/trainsActions';
import {handleFocus, handleChange, addBookingIfNeeded} from '../../actions/index';
import {connect} from 'react-redux';
import TrainForm from '../presentation/TrainForm';
import Navigation from '../presentation/Navigation';
import Typography from 'material-ui/Typography';

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
                <Typography style={{padding: '23px'}} type="headline">Trains</Typography>
                <Navigation {...this.props} />
                <TrainForm {...this.props} />
            </div>
        );
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
        dispatch(fetchTrainsIfNeeded(type || 'current', page || 1));
    },
    isAdding(isAdd) {
        dispatch(setIsAdd(isAdd, 'train'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Train);
