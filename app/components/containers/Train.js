import React from 'react';
import TrainForm from '../presentation/TrainForm';
import {NEW_TRAIN, EDIT_TRAIN} from '../../constants';
import MessageBar from '../presentation/MessageBar';
import Booking from './Booking';

const Train = (props) => {
    return (
        <div>
            <TrainForm {...props}/>
            <MessageBar
                open={props.train.isAdded}
                message="Train saved"
                onRequestClose={props.onRequestClose}
            />
        </div>
    );
};

Train.bookingsLabel = 'trains';
Train.bookingLabel = 'train';
Train.newLabel = NEW_TRAIN;
Train.editLabel = EDIT_TRAIN;

export default Booking(Train);
