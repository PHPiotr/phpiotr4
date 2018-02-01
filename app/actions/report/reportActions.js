import {getReport} from '../../services/reportService';
import * as reportActionTypes from './reportActionTypes';

export const fetchReportIfNeeded = () => {
    return (dispatch, getState) => {
        if (!shouldFetchReport(getState)) {
            return Promise.resolve();
        }
        const {auth: {token}, dateFilter: {fromDate, toDate}} = getState();
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
const shouldFetchReport = (getState) => {
    const {report: {isFetching}} = getState();
    return !isFetching;
};
const fetchReportRequest = () => ({type: reportActionTypes.REPORT_REQUEST});
const fetchReportSuccess = data => ({type: reportActionTypes.REPORT_SUCCESS, data});
const fetchReportFailure = error => ({type: reportActionTypes.REPORT_FAILURE, error});
export const toggleDetailsOpen = payload => ({type: reportActionTypes.TOGGLE_DETAILS_OPEN, payload});