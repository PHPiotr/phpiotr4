import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import {EDIT_HOSTEL, NEW_HOSTEL} from '../../constants';
import Booking from '../containers/Booking';

const HostelForm = ({handleSubmit, handleChange, handleFocus, hostel}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={hostel.errors.booking_number && !!hostel.errors.booking_number.message}
                    helperText={`Code: ${(hostel.errors.booking_number && !!hostel.errors.booking_number.message) ? hostel.errors.booking_number.message : ''}`}
                    id={'booking-number'}
                    type={'text'}
                    name={'booking_number'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.booking_number || ''}
                />
                <TextField
                    error={hostel.errors.hostel_name && !!hostel.errors.hostel_name.message}
                    helperText={`Hostel name: ${(hostel.errors.hostel_name && !!hostel.errors.hostel_name.message) ? hostel.errors.hostel_name.message : ''}`}
                    id={'hostel-name'}
                    type={'text'}
                    name={'hostel_name'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.hostel_name || ''}
                />
                <TextField
                    error={hostel.errors.hostel_address && !!hostel.errors.hostel_address.message}
                    helperText={`Hostel address: ${(hostel.errors.hostel_address && !!hostel.errors.hostel_address.message) ? hostel.errors.hostel_address.message : ''}`}
                    id={'hostel-address'}
                    type={'text'}
                    name={'hostel_address'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.hostel_address || ''}
                />
                <TextField
                    error={hostel.errors.checkin_date && !!hostel.errors.checkin_date.message}
                    helperText={`Check-in date: ${(hostel.errors.checkin_date && !!hostel.errors.checkin_date.message) ? hostel.errors.checkin_date.message : ''}`}
                    id={'checkin-date'}
                    type={'date'}
                    name={'checkin_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.checkin_date || ''}
                />
                <TextField
                    error={hostel.errors.checkout_date && !!hostel.errors.checkout_date.message}
                    helperText={`Check-out date: ${(hostel.errors.checkout_date && !!hostel.errors.checkout_date.message) ? hostel.errors.checkout_date.message : ''}`}
                    id={'checkout-date'}
                    type={'date'}
                    name={'checkout_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.checkout_date || ''}
                />
                <TextField
                    error={hostel.errors.price && !!hostel.errors.price.message}
                    helperText={`Price: ${(hostel.errors.price && !!hostel.errors.price.message) ? hostel.errors.price.message : ''}`}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.current.price || '0.00'}
                />
                <Button type="submit">Save</Button>
            </FormControl>
        </form>
    );
};

HostelForm.bookingsLabel = 'hostels';
HostelForm.bookingLabel = 'hostel';
HostelForm.newLabel = NEW_HOSTEL;
HostelForm.editLabel = EDIT_HOSTEL;

export default Booking(HostelForm);