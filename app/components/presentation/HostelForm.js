import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import {EDIT_HOSTEL, NEW_HOSTEL} from '../../constants';
import Booking from '../containers/Booking';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const HostelForm = (props) => {

    const {hostel} = props;

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Code: ${(hostel.errors.booking_number && !!hostel.errors.booking_number.message) ? hostel.errors.booking_number.message : ''}`}</InputLabel>
                    <Input
                        id={'booking-number'}
                        type={'text'}
                        name={'booking_number'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.booking_number || ''}
                        error={hostel.errors.booking_number && !!hostel.errors.booking_number.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Hostel name: ${(hostel.errors.hostel_name && !!hostel.errors.hostel_name.message) ? hostel.errors.hostel_name.message : ''}`}</InputLabel>
                    <Input
                        id={'hostel-name'}
                        type={'text'}
                        name={'hostel_name'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.hostel_name || ''}
                        error={hostel.errors.hostel_name && !!hostel.errors.hostel_name.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Hostel address: ${(hostel.errors.hostel_address && !!hostel.errors.hostel_address.message) ? hostel.errors.hostel_address.message : ''}`}</InputLabel>
                    <Input
                        id={'hostel-address'}
                        type={'text'}
                        name={'hostel_address'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.hostel_address || ''}
                        error={hostel.errors.hostel_address && !!hostel.errors.hostel_address.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Check-in date: ${(hostel.errors.checkin_date && !!hostel.errors.checkin_date.message) ? hostel.errors.checkin_date.message : ''}`}</InputLabel>
                    <Input
                        inputProps={{max: hostel.current.checkout_date || ''}}
                        id={'checkin-date'}
                        type={'date'}
                        name={'checkin_date'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.checkin_date || ''}
                        error={hostel.errors.checkin_date && !!hostel.errors.checkin_date.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Check-out date: ${(hostel.errors.checkout_date && !!hostel.errors.checkout_date.message) ? hostel.errors.checkout_date.message : ''}`}</InputLabel>
                    <Input
                        inputProps={{min: hostel.current.checkin_date || ''}}
                        id={'checkout-date'}
                        type={'date'}
                        name={'checkout_date'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.checkout_date || ''}
                        error={hostel.errors.checkout_date && !!hostel.errors.checkout_date.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Price: ${(hostel.errors.price && !!hostel.errors.price.message) ? hostel.errors.price.message : ''}`}</InputLabel>
                    <Input
                        id={'price'}
                        type={'text'}
                        name={'price'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={hostel.current.price || '0.00'}
                        error={hostel.errors.price && !!hostel.errors.price.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button raised color="primary" type="submit">Save</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

HostelForm.bookingsLabel = 'hostels';
HostelForm.bookingLabel = 'hostel';
HostelForm.newLabel = NEW_HOSTEL;
HostelForm.editLabel = EDIT_HOSTEL;

export default withStyles(styles)(Booking(HostelForm));