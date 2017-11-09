import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReportIfNeeded} from '../../actions/report';
import {toggleDateFilterEnabled} from '../../actions/index';
import ReportTable from '../presentation/ReportTable';
import Spinner from '../presentation/Spinner';

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
        let report = this.props.report;
        return (
            <div>
                <Spinner isFetching={report.isFetching} />
                <ReportTable report={report}/>
            </div>
        );
    }
}

Report.displayName = 'Report';

const mapStateToProps = state => ({
    report: state.report,
    fromDate: state.dateFilter.fromDate,
    toDate: state.dateFilter.toDate,
    isLoggedIn: state.auth.isLoggedIn,
    isDateFilterEnabled: state.dateFilter.isDateFilterEnabled,
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