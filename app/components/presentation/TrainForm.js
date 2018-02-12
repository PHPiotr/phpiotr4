import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {NEW_TRAIN, EDIT_TRAIN} from '../../constants';
import Booking from '../containers/Booking';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const TrainForm = (props) => {

    const {train} = props;

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`From: ${(train.errors.from && !!train.errors.from.message) ? train.errors.from.message : ''}`}</InputLabel>
                    <Input
                        id={'from'}
                        type={'text'}
                        name={'from'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={train.current.from || ''}
                        error={train.errors.from && !!train.errors.from.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`To: ${(train.errors.to && !!train.errors.to.message) ? train.errors.to.message : ''}`}</InputLabel>
                    <Input
                        id={'to'}
                        type={'text'}
                        name={'to'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={train.current.to || ''}
                        error={train.errors.to && !!train.errors.to.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Departure date: ${(train.errors.departure_date && !!train.errors.departure_date.message) ? train.errors.departure_date.message : ''}`}</InputLabel>
                    <Input
                        inputProps={{max: (!!train.current.is_return && train.current.return_departure_date) ? train.current.return_departure_date : ''}}
                        id={'departure-date'}
                        type={'date'}
                        name={'departure_date'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={train.current.departure_date || ''}
                        error={train.errors.departure_date && !!train.errors.departure_date.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Price: ${(train.errors.price && !!train.errors.price.message) ? train.errors.price.message : ''}`}</InputLabel>
                    <Input
                        id={'price'}
                        type={'text'}
                        name={'price'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={train.current.price || '0.00'}
                        error={train.errors.price && !!train.errors.price.message}
                    />
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        label={`Is return? ${(train.errors.is_return && !!train.errors.is_return.message) ? train.errors.is_return.message : ''}`}
                        control={
                            <Checkbox
                                error={train.errors.is_return && !!train.errors.is_return.message}
                                checked={!!train.current.is_return}
                                onChange={props.handleChange}
                                onFocus={props.handleFocus}
                                value={train.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!train.current.is_return && (
                    <FormControl className={props.classes.formControl}>
                        <InputLabel htmlFor="password">{`Return date: ${(train.errors.return_departure_date && !!train.errors.return_departure_date.message) ? train.errors.return_departure_date.message : ''}`}</InputLabel>
                        <Input
                            inputProps={{min: train.current.departure_date || ''}}
                            id={'return-departure-date'}
                            type={'date'}
                            name={'return_departure_date'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={train.current.return_departure_date || ''}
                            error={train.errors.return_departure_date && !!train.errors.return_departure_date.message}
                        />
                    </FormControl>
                )}
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Save</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

TrainForm.bookingsLabel = 'trains';
TrainForm.bookingLabel = 'train';
TrainForm.newLabel = NEW_TRAIN;
TrainForm.editLabel = EDIT_TRAIN;

export default withStyles(styles)(Booking(TrainForm));