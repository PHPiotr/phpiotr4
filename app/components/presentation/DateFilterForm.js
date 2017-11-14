import React from 'react';
import {TextField, Button} from 'material-ui';
import {FormControl} from 'material-ui/Form';

const DateFilterForm = (props) => {

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    if (!props.isLoggedIn) {
        return null;
    }

    return (
        <form style={{padding: '0 23px 23px'}} onSubmit={props.onSubmit}>
            <FormControl component="fieldset">
                <TextField
                    onChange={props.onChange}
                    type="date"
                    name="from"
                    helperText="From"
                    value={props.dateFilter.fromDate}
                />
                <TextField
                    onChange={props.onChange}
                    type="date"
                    name="to"
                    helperText="To"
                    value={props.dateFilter.toDate}
                />
                <Button style={{marginTop: '20px'}} raised type="submit">Filter</Button>
            </FormControl>
        </form>
    );
};

export default DateFilterForm;