import React from 'react';
import BusForm from '../presentation/BusForm';
import {NEW_BUS, EDIT_BUS} from '../../constants';
import MessageBar from '../presentation/MessageBar';
import Booking from './Booking';

const Bus = (props) => {
    return (
        <div>
            <BusForm {...props}/>
            <MessageBar
                open={props.bus.isAdded}
                message="Bus saved"
                onRequestClose={props.onRequestClose}
            />
        </div>
    );
};

Bus.bookingsLabel = 'buses';
Bus.bookingLabel = 'bus';
Bus.newLabel = NEW_BUS;
Bus.editLabel = EDIT_BUS;

export default Booking(Bus);
