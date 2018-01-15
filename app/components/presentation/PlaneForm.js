import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {NEW_PLANE, EDIT_PLANE} from '../../constants';
import Booking from '../containers/Booking';

const PlaneForm = ({handleSubmit, handleChange, handleFocus, plane}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={plane.errors.confirmation_code && !!plane.errors.confirmation_code.message}
                    helperText={`Code: ${(plane.errors.confirmation_code && !!plane.errors.confirmation_code.message) ? plane.errors.confirmation_code.message : ''}`}
                    id={'confirmation-code'}
                    type={'text'}
                    name={'confirmation_code'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.confirmation_code || ''}
                />
                <TextField
                    error={plane.errors.from && !!plane.errors.from.message}
                    helperText={`From: ${(plane.errors.from && !!plane.errors.from.message) ? plane.errors.from.message : ''}`}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.from || ''}
                />
                <TextField
                    error={plane.errors.to && !!plane.errors.to.message}
                    helperText={`To: ${(plane.errors.to && !!plane.errors.to.message) ? plane.errors.to.message : ''}`}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.to || ''}
                />
                <TextField
                    error={plane.errors.departure_date && !!plane.errors.departure_date.message}
                    helperText={`Departure date: ${(plane.errors.departure_date && !!plane.errors.departure_date.message) ? plane.errors.departure_date.message : ''}`}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.departure_date || ''}
                />
                <TextField
                    error={plane.errors.departure_time && !!plane.errors.departure_time.message}
                    helperText={`Departure time: ${(plane.errors.departure_time && !!plane.errors.departure_time.message) ? plane.errors.departure_time.message : ''}`}
                    id={'departure-time'}
                    type={'time'}
                    name={'departure_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.departure_time || ''}
                />
                <TextField
                    error={plane.errors.arrival_time && !!plane.errors.arrival_time.message}
                    helperText={`Arrival time: ${(plane.errors.arrival_time && !!plane.errors.arrival_time.message) ? plane.errors.arrival_time.message : ''}`}
                    id={'arrival-time'}
                    type={'time'}
                    name={'arrival_time'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.arrival_time || ''}
                />
                <TextField
                    error={plane.errors.seat && !!plane.errors.seat.message}
                    helperText={`Seat: ${(plane.errors.seat && !!plane.errors.seat.message) ? plane.errors.seat.message : ''}`}
                    id={'seat'}
                    type={'text'}
                    name={'seat'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.seat || ''}
                />
                <TextField
                    error={plane.errors.price && !!plane.errors.price.message}
                    helperText={`Price: ${(plane.errors.price && !!plane.errors.price.message) ? plane.errors.price.message : ''}`}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={plane.current.price || '0.00'}
                />
                <FormGroup>
                    <FormControlLabel
                        label={`Is checked-in? ${(plane.errors.checked_in && !!plane.errors.checked_in.message) ? plane.errors.checked_in.message : ''}`}
                        control={
                            <Checkbox
                                error={plane.errors.checked_in && !!plane.errors.checked_in.message}
                                checked={!!plane.current.checked_in}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={plane.current.checked_in ? '1' : '0'}
                                name="checked_in"
                            />
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        label={`Is return? ${(plane.errors.is_return && !!plane.errors.is_return.message) ? plane.errors.is_return.message : ''}`}
                        control={
                            <Checkbox
                                error={plane.errors.is_return && !!plane.errors.is_return.message}
                                checked={!!plane.current.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={plane.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!plane.current.is_return && [
                    <TextField
                        error={plane.errors.return_departure_date && !!plane.errors.return_departure_date.message}
                        helperText={`Return departure date: ${(plane.errors.return_departure_date && !!plane.errors.return_departure_date.message) ? plane.errors.return_departure_date.message : ''}`}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.current.return_departure_date || ''}
                        key={1}
                    />,
                    <TextField
                        error={plane.errors.return_departure_time && !!plane.errors.return_departure_time.message}
                        helperText={`Return departure time: ${(plane.errors.return_departure_time && !!plane.errors.return_departure_time.message) ? plane.errors.return_departure_time.message : ''}`}
                        id={'return-departure-time'}
                        type={'time'}
                        name={'return_departure_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.current.return_departure_time || ''}
                        key={2}
                    />,
                    <TextField
                        error={plane.errors.return_arrival_time && !!plane.errors.return_arrival_time.message}
                        helperText={`Return arrival time: ${(plane.errors.return_arrival_time && !!plane.errors.return_arrival_time.message) ? plane.errors.return_arrival_time.message : ''}`}
                        id={'return-arrival-time'}
                        type={'time'}
                        name={'return_arrival_time'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.current.return_arrival_time || ''}
                        key={3}
                    />,
                    <TextField
                        error={plane.errors.return_seat && !!plane.errors.return_seat.message}
                        helperText={`Return seat: ${(plane.errors.return_seat && !!plane.errors.return_seat.message) ? plane.errors.return_seat.message : ''}`}
                        id={'return_seat'}
                        type={'text'}
                        name={'return_seat'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={plane.current.return_seat || ''}
                        key={4}
                    />,
                ]}
                <Button type="submit">Save</Button>
            </FormControl>
        </form>
    );
};

PlaneForm.bookingsLabel = 'planes';
PlaneForm.bookingLabel = 'plane';
PlaneForm.newLabel = NEW_PLANE;
PlaneForm.editLabel = EDIT_PLANE;

export default Booking(PlaneForm);