import React from 'react';
import HostelForm from '../presentation/HostelForm';
import {EDIT_HOSTEL, NEW_HOSTEL} from '../../constants';
import Booking from './Booking';

const Hostel = props => <HostelForm {...props}/>;

Hostel.bookingsLabel = 'hostels';
Hostel.bookingLabel = 'hostel';
Hostel.newLabel = NEW_HOSTEL;
Hostel.editLabel = EDIT_HOSTEL;

export default Booking(Hostel);
