import React, {Component} from 'react';
import {connect} from 'react-redux';
import getHeaders from '../../getHeaders';
import {fetchReportIfNeeded} from '../../actions/report';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
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
        if (!this.props.isLoggedIn) {
            return null;
        }
        return <ReportTable report={this.props.report}/>;
    }
}

Report.displayName = 'Report';

const mapStateToProps = (state) => ({
    report: state.report,
    fromDate: state.dateFilter.fromDate,
    toDate: state.dateFilter.toDate,
    isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchReportOnLoad(fromDate, toDate) {
        dispatch(verifyIfNeeded(getHeaders())).then((json) => {
            if (json === undefined) {
                return ownProps.router.push('/login');
            }
            if (json.type === undefined) {
                return ownProps.router.push('/login');
            }
            if (json.type !== VERIFY_SUCCESS) {
                return ownProps.router.push('/login');
            }
            dispatch(fetchReportIfNeeded(fromDate, toDate, getHeaders()));
        });
    },
    handleIsDateFilterEnabled(isEnabled) {
        dispatch(toggleDateFilterEnabled(isEnabled));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);