import React from 'react';

const DateFilterForm = (props) => {

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    if (!props.isLoggedIn) {
        return null;
    }

    return (
        <form className="form-inline my-2 my-lg-0 mr-auto" onSubmit={props.onSubmit}>
            <div className="form-group">
                <input onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange}
                    type={props.dateFilter.fromDateFieldType} name="from" className="form-control mr-sm-2"
                    placeholder="From" value={props.dateFilter.fromDate}/>
            </div>
            <div className="form-group">
                <input onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange}
                    type={props.dateFilter.toDateFieldType} name="to" className="form-control mr-sm-2"
                    placeholder="To" value={props.dateFilter.toDate}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn my-2 my-sm-0">Search</button>
            </div>
        </form>
    );
};

export default DateFilterForm;