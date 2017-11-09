import {getReport} from '../services/reportService';

export const REPORT_REQUEST = 'GET_REPORT_REQUEST';
export const REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const REPORT_FAILURE = 'GET_REPORT_FAILURE';

export const fetchReportIfNeeded = () => {
    return (dispatch, getState) => {
        const {report: {isFetching}, auth: {token}, dateFilter: {fromDate, toDate}} = getState();
        if (isFetching) {
            return Promise.resolve();
        }
        dispatch(fetchReportRequest());
        return getReport(token, fromDate, toDate)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchReportSuccess(json)))
            .catch(error => dispatch(fetchReportFailure(error)));
    };
};
const fetchReportRequest = () => ({type: REPORT_REQUEST});
const fetchReportSuccess = data => ({type: REPORT_SUCCESS, data, receivedAt: Date.now()});
const fetchReportFailure = error => ({type: REPORT_FAILURE, error});