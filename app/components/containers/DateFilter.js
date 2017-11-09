import {connect} from 'react-redux';
import {fetchReportIfNeeded} from '../../actions/report';
import {setDate, setDateType} from '../../actions/index';
import DateFilterForm from '../presentation/DateFilterForm';

const mapStateToProps = state => ({
    dateFilter: state.dateFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    },
    onSubmit(event) {
        event.preventDefault();
        if (!ownProps.dateFilter.isDateFilterEnabled) {
            return;
        }
        dispatch(fetchReportIfNeeded());
    },
});
const DateFilter = connect(mapStateToProps, mapDispatchToProps)(DateFilterForm);

export default DateFilter;