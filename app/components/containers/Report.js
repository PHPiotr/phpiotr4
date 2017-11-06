import React, {Component} from 'react';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import {fetchReportIfNeeded} from '../../actions/report';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import {toggleDateFilterEnabled} from '../../actions/index';
import ReportTable from '../presentation/ReportTable';
import Spinner from '../presentation/Spinner';

class Report extends Component {

    componentWillMount() {
        this.props.handleIsDateFilterEnabled(true);
        this.props.fetchReportOnLoad(this.props.fromDate, this.props.toDate);
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

const mapStateToProps = (state) => ({
    report: state.report,
    fromDate: state.dateFilter.fromDate,
    toDate: state.dateFilter.toDate,
    isLoggedIn: state.auth.isLoggedIn,
    isDateFilterEnabled: state.dateFilter.isDateFilterEnabled
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReportOnLoad(fromDate, toDate) {
        dispatch(verifyIfNeeded(getHeaders())).then((json) => {
            if (json === undefined) {
                return ownProps.history.push('/login');
            }
            if (json.type === undefined) {
                return ownProps.history.push('/login');
            }
            if (json.type !== VERIFY_SUCCESS) {
                return ownProps.history.push('/login');
            }
            dispatch(toggleDateFilterEnabled(true));
            dispatch(fetchReportIfNeeded(fromDate, toDate, getHeaders()));
        });
    },
    handleIsDateFilterEnabled(isEnabled) {
        if (ownProps.auth && ownProps.auth.isLoggedIn) {
            dispatch(toggleDateFilterEnabled(isEnabled));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);