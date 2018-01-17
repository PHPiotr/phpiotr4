import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {NEW_TRAIN, EDIT_TRAIN} from '../../constants';
import Booking from '../containers/Booking';

const TrainForm = ({handleSubmit, handleChange, handleFocus, train}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={train.errors.from && !!train.errors.from.message}
                    helperText={`From: ${(train.errors.from && !!train.errors.from.message) ? train.errors.from.message : ''}`}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.from || ''}
                />
                <TextField
                    error={train.errors.to && !!train.errors.to.message}
                    helperText={`To: ${(train.errors.to && !!train.errors.to.message) ? train.errors.to.message : ''}`}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.to || ''}
                />
                <TextField
                    error={train.errors.departure_date && !!train.errors.departure_date.message}
                    helperText={`Departure date: ${(train.errors.departure_date && !!train.errors.departure_date.message) ? train.errors.departure_date.message : ''}`}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.departure_date || ''}
                />
                <TextField
                    error={train.errors.price && !!train.errors.price.message}
                    helperText={`Price: ${(train.errors.price && !!train.errors.price.message) ? train.errors.price.message : ''}`}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.price || '0.00'}
                />
                <FormGroup>
                    <FormControlLabel
                        label={`Is return? ${(train.errors.is_return && !!train.errors.is_return.message) ? train.errors.is_return.message : ''}`}
                        control={
                            <Checkbox
                                error={train.errors.is_return && !!train.errors.is_return.message}
                                checked={!!train.current.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={train.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!train.current.is_return && (
                    <TextField
                        error={train.errors.return_departure_date && !!train.errors.return_departure_date.message}
                        helperText={`Return date: ${(train.errors.return_departure_date && !!train.errors.return_departure_date.message) ? train.errors.return_departure_date.message : ''}`}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={train.current.return_departure_date || ''}
                    />
                )}
                <Button type="submit">Save</Button>
            </FormControl>
        </form>
    );
};

TrainForm.bookingsLabel = 'trains';
TrainForm.bookingLabel = 'train';
TrainForm.newLabel = NEW_TRAIN;
TrainForm.editLabel = EDIT_TRAIN;

export default Booking(TrainForm);