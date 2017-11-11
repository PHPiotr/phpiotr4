import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReportIfNeeded} from '../../actions/report';
import {toggleDateFilterEnabled} from '../../actions/index';
import ReportTable from '../presentation/ReportTable';
import Spinner from '../presentation/Spinner';
import DateFilterForm from '../containers/DateFilter';
import Typography from 'material-ui/Typography';

class Report extends Component {

    componentWillMount() {
        this.props.handleIsDateFilterEnabled(true);
        this.props.fetchReportOnLoad();
    }

    componentWillUnmount() {
        this.props.handleIsDateFilterEnabled(false);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const report = this.props.report;
        if (report.isFetching) {
            return <Spinner isFetching={report.isFetching} />;
        }
        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Total: £{report.total_cost}</Typography>
                <DateFilterForm {...this.props}/>
                <ReportTable report={report}/>
            </div>
        );
    }
}

Report.displayName = 'Report';

const mapStateToProps = ({report, dateFilter, auth: {isLoggedIn}}) => ({
    report,
    dateFilter,
    isLoggedIn,
    fromDate: dateFilter.fromDate,
    toDate: dateFilter.toDate,
    isDateFilterEnabled: dateFilter.isDateFilterEnabled,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReportOnLoad() {
        dispatch(toggleDateFilterEnabled(true));
        dispatch(fetchReportIfNeeded());
    },
    handleIsDateFilterEnabled(isEnabled) {
        if (ownProps.auth && ownProps.auth.isLoggedIn) {
            dispatch(toggleDateFilterEnabled(isEnabled));
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);