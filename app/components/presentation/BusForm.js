import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

const BusForm = ({handleSubmit, handleChange, handleFocus, bus, busErrors}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={busErrors.booking_number && !!busErrors.booking_number.message}
                    helperText={'Code'}
                    id={'booking-number'}
                    type={'text'}
                    name={'booking_number'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.booking_number}
                />
                <TextField
                    error={busErrors.from && !!busErrors.from.message}
                    helperText={'From'}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.from}
                />
                <TextField
                    error={busErrors.to && !!busErrors.to.message}
                    helperText={'To'}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.to}
                />
                <TextField
                    error={busErrors.departure_date && !!busErrors.departure_date.message}
                    helperText={'Departure date'}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.departure_date}
                />
                <TextField
                    error={busErrors.departure_time && !!busErrors.departure_time.message}
                    helperText={'Departure time'}
                    id={'departure-time'}
                    type={'time'}
                    name={'departure_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.departure_time}
                />
                <TextField
                    error={busErrors.price && !!busErrors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={bus.price}
                />
                <FormGroup>
                    <FormControlLabel
                        label={'Is return?'}
                        control={
                            <Checkbox
                                error={busErrors.is_return && !!busErrors.is_return.message}
                                checked={bus.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={bus.is_return ? '1' : '0'}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!bus.is_return && [
                    <TextField
                        error={busErrors.return_departure_date && !!busErrors.return_departure_date.message}
                        helperText={'Return departure date'}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={bus.return_departure_date}
                        key={1}
                    />,
                    <TextField
                        error={busErrors.return_departure_time && !!busErrors.return_departure_time.message}
                        helperText={'Return departure time'}
                        id={'return-departure-time'}
                        type={'time'}
                        name={'return_departure_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={bus.return_departure_time}
                        key={2}
                    />,
                ]}
                <Button type="submit">Add</Button>
            </FormControl>
        </form>
    );
};

export default BusForm;