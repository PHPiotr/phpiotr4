import {connect} from 'react-redux';
import {fetchReportIfNeeded} from '../../actions/report';
import {setDate} from '../../actions/booking/bookingActions';
import DateFilterForm from '../presentation/DateFilterForm';

const mapStateToProps = state => ({
    dateFilter: state.dateFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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