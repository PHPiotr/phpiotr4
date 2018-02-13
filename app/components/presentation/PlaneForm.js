import React from 'react';
import Button from 'material-ui/Button';
import {FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {NEW_PLANE, EDIT_PLANE} from '../../constants';
import Booking from '../containers/Booking';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const PlaneForm = (props) => {

    const {plane} = props;

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Code: ${(plane.errors.confirmation_code && !!plane.errors.confirmation_code.message) ? plane.errors.confirmation_code.message : ''}`}</InputLabel>
                    <Input
                        id={'confirmation-code'}
                        type={'text'}
                        name={'confirmation_code'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.confirmation_code || ''}
                        error={plane.errors.confirmation_code && !!plane.errors.confirmation_code.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`From: ${(plane.errors.from && !!plane.errors.from.message) ? plane.errors.from.message : ''}`}</InputLabel>
                    <Input
                        id={'from'}
                        type={'text'}
                        name={'from'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.from || ''}
                        error={plane.errors.from && !!plane.errors.from.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`To: ${(plane.errors.to && !!plane.errors.to.message) ? plane.errors.to.message : ''}`}</InputLabel>
                    <Input
                        id={'to'}
                        type={'text'}
                        name={'to'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.to || ''}
                        error={plane.errors.to && !!plane.errors.to.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Departure date: ${(plane.errors.departure_date && !!plane.errors.departure_date.message) ? plane.errors.departure_date.message : ''}`}</InputLabel>
                    <Input
                        inputProps={{max: (!!plane.current.is_return && plane.current.return_departure_date) ? plane.current.return_departure_date : ''}}
                        id={'departure-date'}
                        type={'date'}
                        name={'departure_date'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.departure_date || ''}
                        error={plane.errors.departure_date && !!plane.errors.departure_date.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Departure time: ${(plane.errors.departure_time && !!plane.errors.departure_time.message) ? plane.errors.departure_time.message : ''}`}</InputLabel>
                    <Input
                        id={'departure-time'}
                        type={'time'}
                        name={'departure_time'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.departure_time || ''}
                        error={plane.errors.departure_time && !!plane.errors.departure_time.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Arrival time: ${(plane.errors.arrival_time && !!plane.errors.arrival_time.message) ? plane.errors.arrival_time.message : ''}`}</InputLabel>
                    <Input
                        id={'arrival-time'}
                        type={'time'}
                        name={'arrival_time'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.arrival_time || ''}
                        error={plane.errors.arrival_time && !!plane.errors.arrival_time.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Seat: ${(plane.errors.seat && !!plane.errors.seat.message) ? plane.errors.seat.message : ''}`}</InputLabel>
                    <Input
                        id={'seat'}
                        type={'text'}
                        name={'seat'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.seat || ''}
                        error={plane.errors.seat && !!plane.errors.seat.message}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Price: ${(plane.errors.price && !!plane.errors.price.message) ? plane.errors.price.message : ''}`}</InputLabel>
                    <Input
                        id={'price'}
                        type={'text'}
                        name={'price'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={plane.current.price || '0.00'}
                        error={plane.errors.price && !!plane.errors.price.message}
                    />
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        label={`Is checked-in? ${(plane.errors.checked_in && !!plane.errors.checked_in.message) ? plane.errors.checked_in.message : ''}`}
                        control={
                            <Checkbox
                                error={plane.errors.checked_in && !!plane.errors.checked_in.message}
                                checked={!!plane.current.checked_in}
                                onChange={props.handleChange}
                                onFocus={props.handleFocus}
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
                                onChange={props.handleChange}
                                onFocus={props.handleFocus}
                                value={plane.current.is_return ? '1' : ''}
                                name="is_return"
                            />
                        }
                    />
                </FormGroup>
                {!!plane.current.is_return && [
                    <FormControl className={props.classes.formControl} key={1}>
                        <InputLabel htmlFor="password">{`Return departure date: ${(plane.errors.return_departure_date && !!plane.errors.return_departure_date.message) ? plane.errors.return_departure_date.message : ''}`}</InputLabel>
                        <Input
                            inputProps={{min: plane.current.departure_date || ''}}
                            id={'return-departure-date'}
                            type={'date'}
                            name={'return_departure_date'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={plane.current.return_departure_date || ''}
                            error={plane.errors.return_departure_date && !!plane.errors.return_departure_date.message}
                        />
                    </FormControl>,
                    <FormControl className={props.classes.formControl} key={2}>
                        <InputLabel htmlFor="password">{`Return departure time: ${(plane.errors.return_departure_time && !!plane.errors.return_departure_time.message) ? plane.errors.return_departure_time.message : ''}`}</InputLabel>
                        <Input
                            id={'return-departure-time'}
                            type={'time'}
                            name={'return_departure_time'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={plane.current.return_departure_time || ''}
                            error={plane.errors.return_departure_time && !!plane.errors.return_departure_time.message}
                        />
                    </FormControl>,
                    <FormControl className={props.classes.formControl} key={3}>
                        <InputLabel htmlFor="password">{`Return arrival time: ${(plane.errors.return_arrival_time && !!plane.errors.return_arrival_time.message) ? plane.errors.return_arrival_time.message : ''}`}</InputLabel>
                        <Input
                            id={'return-arrival-time'}
                            type={'time'}
                            name={'return_arrival_time'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={plane.current.return_arrival_time || ''}
                            error={plane.errors.return_arrival_time && !!plane.errors.return_arrival_time.message}
                        />
                    </FormControl>,
                    <FormControl className={props.classes.formControl} key={4}>
                        <InputLabel htmlFor="password">{`Return seat: ${(plane.errors.return_seat && !!plane.errors.return_seat.message) ? plane.errors.return_seat.message : ''}`}</InputLabel>
                        <Input
                            id={'return_seat'}
                            type={'text'}
                            name={'return_seat'}
                            onChange={props.handleChange}
                            onFocus={props.handleFocus}
                            value={plane.current.return_seat || ''}
                            error={plane.errors.return_seat && !!plane.errors.return_seat.message}
                        />
                    </FormControl>,
                ]}
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Save</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

PlaneForm.bookingsLabel = 'planes';
PlaneForm.bookingLabel = 'plane';
PlaneForm.newLabel = NEW_PLANE;
PlaneForm.editLabel = EDIT_PLANE;

export default withStyles(styles)(Booking(PlaneForm));