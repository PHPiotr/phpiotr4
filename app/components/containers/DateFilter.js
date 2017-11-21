import {connect} from 'react-redux';
import {fetchReportIfNeeded} from '../../actions/report/reportActions';
import {setDate} from '../../actions/dateFilter/dateFilterActions';
import DateFilterForm from '../presentation/DateFilterForm';

const mapStateToProps = state => ({
    dateFilter: state.dateFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange(event) {
        dispatch(setDate({name: `${event.target.name}Date`, value: event.target.value}));
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