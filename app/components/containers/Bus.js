import React from 'react';
import BusForm from '../presentation/BusForm';
import {NEW_BUS, EDIT_BUS} from '../../constants';
import Booking from './Booking';

const Bus = props => <BusForm {...props}/>;

Bus.bookingsLabel = 'buses';
Bus.bookingLabel = 'bus';
Bus.newLabel = NEW_BUS;
Bus.editLabel = EDIT_BUS;

export default Booking(Bus);
