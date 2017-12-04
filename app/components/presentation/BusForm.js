import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {NEW_BUS, EDIT_BUS} from '../../constants';

const BusForm = ({handleSubmit, handleChange, handleFocus, bus}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={bus.errors.booking_number && !!bus.errors.booking_number.message}
                    helperText={'Code'}
                    id={'booking-number'}
                    type={'text'}
                    name={'booking_number'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.booking_number || ''}
                />
                <TextField
                    error={bus.errors.from && !!bus.errors.from.message}
                    helperText={'From'}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.from || ''}
                />
                <TextField
                    error={bus.errors.to && !!bus.errors.to.message}
                    helperText={'To'}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.to || ''}
                />
                <TextField
                    error={bus.errors.departure_date && !!bus.errors.departure_date.message}
                    helperText={'Departure date'}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.departure_date || ''}
                />
                <TextField
                    error={bus.errors.departure_time && !!bus.errors.departure_time.message}
                    helperText={'Departure time'}
                    id={'departure-time'}
                    type={'time'}
                    name={'departure_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.departure_time || ''}
                />
                <TextField
                    error={bus.errors.price && !!bus.errors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.current.price || '0.00'}
                />
                <FormGroup>
                    <FormControlLabel
                        label={'Is return?'}
                        control={
                            <Checkbox
                                error={bus.errors.is_return && !!bus.errors.is_return.message}
                                checked={!!bus.current.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={bus.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!bus.current.is_return && [
                    <TextField
                        error={bus.errors.return_departure_date && !!bus.errors.return_departure_date.message}
                        helperText={'Return departure date'}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={bus.current.return_departure_date || ''}
                        key={1}
                    />,
                    <TextField
                        error={bus.errors.return_departure_time && !!bus.errors.return_departure_time.message}
                        helperText={'Return departure time'}
                        id={'return-departure-time'}
                        type={'time'}
                        name={'return_departure_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={bus.current.return_departure_time || ''}
                        key={2}
                    />,
                ]}
                <Button type="submit">Save</Button>
            </FormControl>
        </form>
    );
};

BusForm.bookingsLabel = 'buses';
BusForm.bookingLabel = 'bus';
BusForm.newLabel = NEW_BUS;
BusForm.editLabel = EDIT_BUS;

export default BusForm;