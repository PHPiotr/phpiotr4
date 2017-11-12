import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

const PlaneForm = ({handleSubmit, handleChange, handleFocus, plane, planeErrors}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={planeErrors.confirmation_code && !!planeErrors.confirmation_code.message}
                    helperText={'Code'}
                    id={'confirmation-code'}
                    type={'text'}
                    name={'confirmation_code'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.confirmation_code}
                />
                <TextField
                    error={planeErrors.from && !!planeErrors.from.message}
                    helperText={'From'}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.from}
                />
                <TextField
                    error={planeErrors.to && !!planeErrors.to.message}
                    helperText={'To'}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.to}
                />
                <TextField
                    error={planeErrors.departure_date && !!planeErrors.departure_date.message}
                    helperText={'Departure date'}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.departure_date}
                />
                <TextField
                    error={planeErrors.departure_time && !!planeErrors.departure_time.message}
                    helperText={'Departure time'}
                    id={'departure-time'}
                    type={'time'}
                    name={'departure_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.departure_time}
                />
                <TextField
                    error={planeErrors.arrival_time && !!planeErrors.arrival_time.message}
                    helperText={'Arrival time'}
                    id={'arrival-time'}
                    type={'time'}
                    name={'arrival_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.arrival_time}
                />
                <TextField
                    error={planeErrors.seat && !!planeErrors.seat.message}
                    helperText={'Seat'}
                    id={'seat'}
                    type={'text'}
                    name={'seat'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.seat}
                />
                <TextField
                    error={planeErrors.price && !!planeErrors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.price}
                />
                <FormGroup>
                    <FormControlLabel
                        label={'Is checked-in?'}
                        control={
                            <Checkbox
                                error={planeErrors.checked_in && !!planeErrors.checked_in.message}
                                checked={plane.checked_in}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={plane.checked_in ? '1' : '0'}
                                name="checked_in"
                            />
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        label={'Is return?'}
                        control={
                            <Checkbox
                                error={planeErrors.is_return && !!planeErrors.is_return.message}
                                checked={plane.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={plane.is_return ? '1' : '0'}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!plane.is_return && [
                    <TextField
                        error={planeErrors.return_departure_date && !!planeErrors.return_departure_date.message}
                        helperText={'Return departure date'}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.return_departure_date}
                        key={1}
                    />,
                    <TextField
                        error={planeErrors.return_departure_time && !!planeErrors.return_departure_time.message}
                        helperText={'Return departure time'}
                        id={'return-departure-time'}
                        type={'time'}
                        name={'return_departure_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.return_departure_time}
                        key={2}
                    />,
                    <TextField
                        error={planeErrors.return_arrival_time && !!planeErrors.return_arrival_time.message}
                        helperText={'Return arrival time'}
                        id={'return-arrival-time'}
                        type={'time'}
                        name={'return_arrival_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.return_arrival_time}
                        key={3}
                    />,
                    <TextField
                        error={planeErrors.return_seat && !!planeErrors.return_seat.message}
                        helperText={'Return seat'}
                        id={'return_seat'}
                        type={'text'}
                        name={'return_seat'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.return_seat}
                        key={4}
                    />,
                ]}
                <Button type="submit">Add</Button>
            </FormControl>
        </form>
    );
};

export default PlaneForm;