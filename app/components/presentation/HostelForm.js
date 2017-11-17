import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';

const HostelForm = ({handleSubmit, handleChange, handleFocus, hostel, hostelErrors}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={hostelErrors.booking_number && !!hostelErrors.booking_number.message}
                    helperText={'Code'}
                    id={'booking-number'}
                    type={'text'}
                    name={'booking_number'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.booking_number || ''}
                />
                <TextField
                    error={hostelErrors.hostel_name && !!hostelErrors.hostel_name.message}
                    helperText={'Hostel name'}
                    id={'hostel-name'}
                    type={'text'}
                    name={'hostel_name'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.hostel_name || ''}
                />
                <TextField
                    error={hostelErrors.hostel_address && !!hostelErrors.hostel_address.message}
                    helperText={'Hostel address'}
                    id={'hostel-address'}
                    type={'text'}
                    name={'hostel_address'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.hostel_address || ''}
                />
                <TextField
                    error={hostelErrors.checkin_date && !!hostelErrors.checkin_date.message}
                    helperText={'Check-in date'}
                    id={'checkin-date'}
                    type={'date'}
                    name={'checkin_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.checkin_date || ''}
                />
                <TextField
                    error={hostelErrors.checkout_date && !!hostelErrors.checkout_date.message}
                    helperText={'Check-out date'}
                    id={'checkout-date'}
                    type={'date'}
                    name={'checkout_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.checkout_date || ''}
                />
                <TextField
                    error={hostelErrors.price && !!hostelErrors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={hostel.price || ''}
                />
                <Button type="submit">Add</Button>
            </FormControl>
        </form>
    );
};

export default HostelForm;