import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

const TrainForm = ({handleSubmit, handleChange, handleFocus, train}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={train.errors.from && !!train.errors.from.message}
                    helperText={'From'}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.from || ''}
                />
                <TextField
                    error={train.errors.to && !!train.errors.to.message}
                    helperText={'To'}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.to || ''}
                />
                <TextField
                    error={train.errors.departure_date && !!train.errors.departure_date.message}
                    helperText={'Departure date'}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.departure_date || ''}
                />
                <TextField
                    error={train.errors.price && !!train.errors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.current.price || ''}
                />
                <FormGroup>
                    <FormControlLabel
                        label={'Is return?'}
                        control={
                            <Checkbox
                                error={train.errors.is_return && !!train.errors.is_return.message}
                                checked={train.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={train.current.is_return ? '1' : '0'}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!train.current.is_return && (
                    <TextField
                        error={train.errors.return_departure_date && !!train.errors.return_departure_date.message}
                        helperText={'Return departure date'}
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

export default TrainForm;