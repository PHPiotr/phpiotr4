import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReportIfNeeded, toggleDetailsOpen} from '../../actions/report/reportActions';
import {toggleDateFilterEnabled} from '../../actions/dateFilter/dateFilterActions';
import ReportTable from '../presentation/ReportTable';
import {LinearProgress} from 'material-ui/Progress';
import DateFilterForm from '../containers/DateFilter';
import Typography from 'material-ui/Typography';
import {setAppBarTitle} from '../../actions/app/appActions';
import {HOME} from '../../constants';

class Report extends Component {

    componentDidMount() {
        this.props.handleIsDateFilterEnabled(true);
        this.props.fetchReportOnLoad();
        this.props.setAppBarTitle(HOME);
    }

    componentWillUnmount() {
        this.props.handleIsDateFilterEnabled(false);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {report, toggleDetailsOpen} = this.props;
        if (report.isFetching) {
            return <LinearProgress />;
        }
        return (
            <div>
                <Typography style={{padding: '23px'}} type="headline">Total: £{report.totalCost}</Typography>
                <DateFilterForm {...this.props}/>
                <ReportTable report={report} toggleDetailsOpen={toggleDetailsOpen}/>
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
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
    toggleDetailsOpen(payload) {
        dispatch(toggleDetailsOpen(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);