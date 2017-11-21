import {getReport} from '../../services/reportService';
import * as reportActionTypes from './reportActionTypes';

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
const fetchReportRequest = () => ({type: reportActionTypes.REPORT_REQUEST});
const fetchReportSuccess = data => ({type: reportActionTypes.REPORT_SUCCESS, data, receivedAt: Date.now()});
const fetchReportFailure = error => ({type: reportActionTypes.REPORT_FAILURE, error});
export const toggleDetailsOpen = payload => ({type: reportActionTypes.TOGGLE_DETAILS_OPEN, payload});