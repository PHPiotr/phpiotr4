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
        <form onSubmit={props.onSubmit}>
            <TextField
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onChange={props.onChange}
                type={props.dateFilter.fromDateFieldType}
                name="from"
                label="From"
                value={props.dateFilter.fromDate}
            />
            <TextField
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onChange={props.onChange}
                type={props.dateFilter.toDateFieldType}
                name="to"
                label="To"
                value={props.dateFilter.toDate}
            />
            <Button type="submit">Search</Button>
        </form>
    );
};

export default DateFilterForm;