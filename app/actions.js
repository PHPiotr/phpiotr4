import fetch from 'isomorphic-fetch';
import config from '../config';

export const setLoggedIn = () => ({
    type: 'SET_LOGGED_IN'
});
export const setLoggedOut = () => ({
    type: 'SET_LOGGED_OUT'
});
export const onChangeLoginField = (fieldName, fieldValue) => ({
    type: 'ON_CHANGE_LOGIN_FIELD',
    fieldName,
    fieldValue,
});
export const onFocusLoginField = (fieldName) => ({
    type: 'ON_FOCUS_LOGIN_FIELD',
    fieldName,
});
export const setLoginFailed = (loginErrorMessage, loginErrors) => ({
    type: 'SET_LOGIN_FAILED',
    loginErrorMessage,
    loginErrors,
});

export const FETCH_REPORT_REQUEST = 'FETCH_REPORT_REQUEST';
const fetchReportRequest = () => ({
    type: 'FETCH_REPORT_REQUEST',
});
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
const fetchReportSuccess = (data) => ({
    type: 'FETCH_REPORT_SUCCESS',
    data,
    receivedAt: Date.now()
});
export const FETCH_REPORT_FAILURE = 'FETCH_REPORT_FAILURE';
const fetchReportFailure = (error) => ({
    type: 'FETCH_REPORT_FAILURE',
    error
});
const fetchReport = (fromDate, toDate, headers) => {
    return (dispatch) => {
        dispatch(fetchReportRequest());
        return fetch(`${config.api_url}/api/v1/report?from=${fromDate}&to=${toDate}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchReportSuccess(json)))
            .catch(error => dispatch(fetchReportFailure(error)))
    }
};
function shouldFetchReport(state) {
    if (state.report.isFetching) {
        return false
    }
    return true;
}
export const fetchReportIfNeeded = (fromDate, toDate, headers) => {

    return (dispatch, getState) => {
        if (shouldFetchReport(getState())) {
            return dispatch(fetchReport(fromDate, toDate, headers))
        } else {
            return Promise.resolve();
        }
    }
}

export const setBookings = (bookingLabelPlural, data) => ({
    type: 'SET_BOOKINGS',
    bookingLabelPlural,
    data,
});
export const setBooking = (bookingLabelSingular, fieldName, fieldValue) => ({
    type: 'SET_BOOKING',
    bookingLabelSingular,
    fieldName,
    fieldValue,
});
export const setBookingInserted = (bookingLabelSingular, bookingInserted) => ({
    type: 'SET_BOOKING_INSERTED',
    bookingLabelSingular,
    bookingInserted,
});
export const setBookingErrorMessage = (bookingLabelSingular, errorMessageValue) => ({
    type: 'SET_BOOKING_ERROR_MESSAGE',
    bookingLabelSingular,
    errorMessageValue,
});
export const setBookingErrors = (bookingLabelSingular, errorsValue) => ({
    type: 'SET_BOOKING_ERRORS',
    bookingLabelSingular,
    errorsValue,
});
export const setBookingInputError = (bookingLabelSingular, errorsValue, fieldName) => ({
    type: 'SET_BOOKING_INPUT_ERROR',
    bookingLabelSingular,
    errorsValue,
    fieldName,
});

export const toggleDateFilterEnabled = (isDateFilterEnabled) => ({
    type: 'TOGGLE_DATE_FILTER_ENABLED',
    isDateFilterEnabled,
});
export const setDate = (dateFieldName, dateFieldValue) => ({
    type: 'SET_DATE',
    dateFieldName,
    dateFieldValue,
});
export const setDateType = (dateTypeName, dateTypeValue) => ({
    type: 'SET_DATE_TYPE',
    dateTypeName,
    dateTypeValue,
});
