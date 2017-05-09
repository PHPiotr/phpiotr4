import fetch from 'isomorphic-fetch';
import {api_url} from '../../config';

export const REPORT_REQUEST = 'REPORT_REQUEST';
export const REPORT_SUCCESS = 'REPORT_SUCCESS';
export const REPORT_FAILURE = 'REPORT_FAILURE';

const shouldFetchReport = (state) => {
    if (state.report.isFetching) {
        return false
    }
    return true;
};

const fetchReportRequest = () => ({
    type: REPORT_REQUEST,
});

const fetchReportSuccess = (data) => ({
    type: REPORT_SUCCESS,
    data,
    receivedAt: Date.now()
});

const fetchReportFailure = (error) => ({
    type: REPORT_FAILURE,
    error
});

const fetchReport = (fromDate, toDate, headers) => {
    return (dispatch) => {
        dispatch(fetchReportRequest());
        return fetch(`${api_url}/api/v1/report?from=${fromDate}&to=${toDate}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchReportSuccess(json)))
            .catch(error => dispatch(fetchReportFailure(error)))
    }
};

export const fetchReportIfNeeded = (fromDate, toDate, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchReport(getState())) {
            return dispatch(fetchReport(fromDate, toDate, headers))
        }
        return Promise.resolve();
    }
};