import React from 'react';
import {TextField, Button} from 'material-ui';

const DateFilterForm = (props) => {

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    if (!props.isLoggedIn) {
        return null;
    }

    return (
        <form style={{padding: '0 0 23px'}} onSubmit={props.onSubmit}>
            <TextField
                style={{marginLeft: '23px'}}
                onChange={props.onChange}
                type="date"
                name="from"
                helperText="From"
                value={props.dateFilter.fromDate}
            />
            <TextField
                style={{marginLeft: '23px', marginBottom: '23px'}}
                onChange={props.onChange}
                type="date"
                name="to"
                helperText="To"
                value={props.dateFilter.toDate}
            />
            <Button raised style={{marginLeft: '23px'}} type="submit">Search</Button>
        </form>
    );
};

export default DateFilterForm;