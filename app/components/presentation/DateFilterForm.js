import React from 'react';

const DateFilterForm = (props) => {

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    if (!props.isLoggedIn) {
        return null;
    }

    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <input onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange}
                       type={props.dateFilter.fromDateFieldType} name="from" className="form-control"
                       placeholder="From" value={props.dateFilter.fromDate}/>
            </div>
            <div className="form-group">
                <input onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange}
                       type={props.dateFilter.toDateFieldType} name="to" className="form-control"
                       placeholder="To" value={props.dateFilter.toDate}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Search</button>
            </div>
        </form>
    )
};

export default DateFilterForm;