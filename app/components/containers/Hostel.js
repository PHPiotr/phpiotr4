import React from 'react';
import HostelForm from '../presentation/HostelForm';
import {EDIT_HOSTEL, NEW_HOSTEL} from '../../constants';
import MessageBar from '../presentation/MessageBar';
import Booking from './Booking';

const Hostel = (props) => {
    return (
        <div>
            <HostelForm {...props}/>
            <MessageBar
                open={props.hostel.isAdded}
                message="Hostel saved"
                onRequestClose={props.onRequestClose}
            />
        </div>
    );
};

Hostel.bookingsLabel = 'hostels';
Hostel.bookingLabel = 'hostel';
Hostel.newLabel = NEW_HOSTEL;
Hostel.editLabel = EDIT_HOSTEL;

export default Booking(Hostel);
