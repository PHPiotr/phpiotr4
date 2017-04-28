import React from 'react';
import {connect} from 'react-redux';
import {setDate, setDateType} from '../../actionCreators';

let DateFilterForm = (props, ownProps) => {

    console.log('props, ownProps:', props, ownProps);

    if (!props.dateFilter.isDateFilterEnabled) {
        return null;
    }

    return (
        <form onSubmit={props.onDateFilterFormSubmit}>
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
    );
};

const mapStateToProps = (state) => ({
    dateFilter: state.dateFilter
});

const mapDispatchToProps = (dispatch) => ({
    onFocus(event) {
        const target = event.target;
        const fieldType = `${target.name}DateFieldType`;
        if (target.type === 'date') {
            return;
        }
        dispatch(setDateType(fieldType, 'date'));
    },
    onBlur(event) {
        const target = event.target;

        if (target.value) {
            return;
        }

        const fieldType = `${target.name}DateFieldType`;

        if (target.type === 'text') {
            return;
        }

        dispatch(setDateType(fieldType, 'text'));
    },
    onChange(event) {
        dispatch(setDate(`${event.target.name}Date`, event.target.value));
    }
});
DateFilterForm = connect(mapStateToProps, mapDispatchToProps)(DateFilterForm);

export default DateFilterForm;