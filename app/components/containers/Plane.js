import React from 'react';
import PlaneForm from '../presentation/PlaneForm';
import {NEW_PLANE, EDIT_PLANE} from '../../constants';
import Booking from './Booking';

const Plane = props => <PlaneForm {...props}/>;

Plane.bookingsLabel = 'planes';
Plane.bookingLabel = 'plane';
Plane.newLabel = NEW_PLANE;
Plane.editLabel = EDIT_PLANE;

export default Booking(Plane);
