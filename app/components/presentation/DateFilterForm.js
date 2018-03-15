import React from 'react';
import {Button} from 'material-ui';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const DateFilterForm = (props) => {

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    if (!props.isLoggedIn) {
        return null;
    }

    return (
        <form className={props.classes.root} onSubmit={props.onSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="from">{'From'}</InputLabel>
                    <Input
                        id="from"
                        inputProps={{max: props.dateFilter.toDate || ''}}
                        type={'date'}
                        name={'from'}
                        onChange={props.onChange}
                        value={props.dateFilter.fromDate || ''}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="to">{'To'}</InputLabel>
                    <Input
                        id="to"
                        inputProps={{min: props.dateFilter.fromDate || ''}}
                        type={'date'}
                        name={'to'}
                        onChange={props.onChange}
                        value={props.dateFilter.toDate || ''}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Filter</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(DateFilterForm);