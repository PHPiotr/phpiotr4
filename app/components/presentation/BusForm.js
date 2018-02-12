import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {NEW_BUS, EDIT_BUS} from '../../constants';
import Booking from '../containers/Booking';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const BusForm = (props) => {

    const {bus} = props;

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Code: ${(bus.errors.booking_number && !!bus.errors.booking_number.message) ? bus.errors.booking_number.message : ''}`}</InputLabel>
                    <Input
                        id={'booking-number'}
                        type={'text'}
                        name={'booking_number'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.booking_number || ''}
                        error={bus.errors.booking_number && !!bus.errors.booking_number.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`From: ${(bus.errors.from && !!bus.errors.from.message) ? bus.errors.from.message : ''}`}</InputLabel>
                    <Input
                        id={'from'}
                        type={'text'}
                        name={'from'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.from || ''}
                        error={bus.errors.from && !!bus.errors.from.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`To: ${(bus.errors.to && !!bus.errors.to.message) ? bus.errors.to.message : ''}`}</InputLabel>
                    <Input
                        id={'to'}
                        type={'text'}
                        name={'to'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.to || ''}
                        error={bus.errors.to && !!bus.errors.to.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Departure date: ${(bus.errors.departure_date && !!bus.errors.departure_date.message) ? bus.errors.departure_date.message : ''}`}</InputLabel>
                    <Input
                        inputProps={{max: (!!bus.current.is_return && bus.current.return_departure_date) ? bus.current.return_departure_date : ''}}
                        id={'departure-date'}
                        type={'date'}
                        name={'departure_date'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.departure_date || ''}
                        error={bus.errors.departure_date && !!bus.errors.departure_date.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Departure time: ${(bus.errors.departure_time && !!bus.errors.departure_time.message) ? bus.errors.departure_time.message : ''}`}</InputLabel>
                    <Input
                        id={'departure-time'}
                        type={'time'}
                        name={'departure_time'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.departure_time || ''}
                        error={bus.errors.departure_time && !!bus.errors.departure_time.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Price: ${(bus.errors.price && !!bus.errors.price.message) ? bus.errors.price.message : ''}`}</InputLabel>
                    <Input
                        id={'price'}
                        type={'text'}
                        name={'price'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={bus.current.price || '0.00'}
                        error={bus.errors.price && !!bus.errors.price.message}
                    />
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        label={`Is return? ${(bus.errors.is_return && !!bus.errors.is_return.message) ? bus.errors.is_return.message : ''}`}
                        control={
                            <Checkbox
                                error={bus.errors.is_return && !!bus.errors.is_return.message}
                                checked={!!bus.current.is_return}
                                onChange={props.handleChange}
                                onFocus={props.handleFocus}
                                value={bus.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>

                {!!bus.current.is_return && [
                    <FormControl className={props.classes.formControl} key={1}>
                        <InputLabel htmlFor="password">{`Return departure date: ${(bus.errors.return_departure_date && !!bus.errors.return_departure_date.message) ? bus.errors.return_departure_date.message : ''}`}</InputLabel>
                        <Input
                            inputProps={{min: bus.current.departure_date || ''}}
                            id={'return-departure-date'}
                            type={'date'}
                            name={'return_departure_date'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={bus.current.return_departure_date || ''}
                            error={bus.errors.return_departure_date && !!bus.errors.return_departure_date.message}
                        />
                    </FormControl>,
                    <FormControl className={props.classes.formControl} key={2}>
                        <InputLabel htmlFor="password">{`Return departure time: ${(bus.errors.return_departure_time && !!bus.errors.return_departure_time.message) ? bus.errors.return_departure_time.message : ''}`}</InputLabel>
                        <Input
                            id={'return-departure-time'}
                            type={'time'}
                            name={'return_departure_time'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={bus.current.return_departure_time || ''}
                            error={bus.errors.return_departure_time && !!bus.errors.return_departure_time.message}
                        />
                    </FormControl>,
                ]}
                <FormControl className={props.classes.formControl}>
                    <Button raised color="primary" type="submit">Save</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

BusForm.bookingsLabel = 'buses';
BusForm.bookingLabel = 'bus';
BusForm.newLabel = NEW_BUS;
BusForm.editLabel = EDIT_BUS;

export default withStyles(styles)(Booking(BusForm));