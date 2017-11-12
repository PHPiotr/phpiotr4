import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

const TrainForm = ({handleSubmit, handleChange, handleFocus, train, trainErrors}) => {
    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <TextField
                    error={trainErrors.from && !!trainErrors.from.message}
                    helperText={'From'}
                    id={'from'}
                    type={'text'}
                    name={'from'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    vałlue={train.from}
                />
                <TextField
                    error={trainErrors.to && !!trainErrors.to.message}
                    helperText={'To'}
                    id={'to'}
                    type={'text'}
                    name={'to'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.to}
                />
                <TextField
                    error={trainErrors.departure_date && !!trainErrors.departure_date.message}
                    helperText={'Departure date'}
                    id={'departure-date'}
                    type={'date'}
                    name={'departure_date'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.departure_date}
                />
                <TextField
                    error={trainErrors.price && !!trainErrors.price.message}
                    helperText={'Price'}
                    id={'price'}
                    type={'text'}
                    name={'price'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={train.price}
                />
                <FormGroup>
                    <FormControlLabel
                        label={'Is return?'}
                        control={
                            <Checkbox
                                error={trainErrors.is_return && !!trainErrors.is_return.message}
                                checked={train.is_return}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={train.is_return ? '1' : '0'}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!train.is_return && (
                    <TextField
                        error={trainErrors.return_departure_date && !!trainErrors.return_departure_date.message}
                        helperText={'Return departure date'}
                        id={'return-departure-date'}
                        type={'date'}
                        name={'return_departure_date'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={train.return_departure_date}
                    />
                )}
                <Button type="submit">Add</Button>
            </FormControl>
        </form>
    );
};

export default TrainForm;