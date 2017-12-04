import React from 'react';
import PlaneForm from '../presentation/PlaneForm';
import {NEW_PLANE, EDIT_PLANE} from '../../constants';
import MessageBar from '../presentation/MessageBar';
import Booking from './Booking';

const Plane = (props) => {
    return (
        <div>
            <PlaneForm {...props}/>
            <MessageBar
                open={props.plane.isAdded}
                message="Plane saved"
                onRequestClose={props.onRequestClose}
            />
        </div>
    );
};

Plane.bookingsLabel = 'planes';
Plane.bookingLabel = 'plane';
Plane.newLabel = NEW_PLANE;
Plane.editLabel = EDIT_PLANE;

export default Booking(Plane);
