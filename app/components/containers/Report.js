import Auth from './Auth';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import {fetchReportIfNeeded} from '../../actions/report';
import {toggleDateFilterEnabled} from '../../actions/index';
import ReportTable from '../presentation/ReportTable';

class Report extends Component {

    componentWillMount() {
        this.props.handleIsDateFilterEnabled(true);
        this.props.fetchReportOnLoad(this.props.fromDate, this.props.toDate);
    }

    componentWillUnmount() {
        this.props.handleIsDateFilterEnabled(false);
    }

    render() {
        return <ReportTable report={this.props.report}/>;
    }
}

Report.displayName = 'Report';

const mapStateToProps = (state) => ({
    report: state.report,
    fromDate: state.dateFilter.fromDate,
    toDate: state.dateFilter.toDate,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReportOnLoad(fromDate, toDate) {
        dispatch(fetchReportIfNeeded(fromDate, toDate, getHeaders()));
    },
    handleIsDateFilterEnabled(isEnabled) {
        dispatch(toggleDateFilterEnabled(isEnabled));
    }
});

Report = connect(mapStateToProps, mapDispatchToProps)(Report);

export default Auth(Report);