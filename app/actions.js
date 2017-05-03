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
        }
        return Promise.resolve();
    }
}

export const FETCH_BUSES_REQUEST = 'FETCH_BUSES_REQUEST';
const fetchBusesRequest = () => ({
    type: FETCH_BUSES_REQUEST
});
export const FETCH_BUSES_SUCCESS = 'FETCH_BUSES_SUCCESS';
const fetchBusesSuccess = (data) => ({
    type: FETCH_BUSES_SUCCESS,
    data,
    receivedAt: Date.now()
});
export const FETCH_BUSES_FAILURE = 'FETCH_BUSES_FAILURE';
const fetchBusesFailure = (error) => ({
    type: FETCH_BUSES_FAILURE, error
});
const fetchBuses = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchBusesRequest());
        return fetch(`${config.api_url}/api/v1/bookings/buses?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchBusesSuccess(json)))
            .catch(error => dispatch(fetchBusesFailure(error)))
    }
};
function shouldFetchBuses(state) {
    if (state.buses.isFetching) {
        return false
    }
    return true;
}
export const fetchBusesIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchBuses(getState())) {
            return dispatch(fetchBuses(type, page, headers))
        }
        return Promise.resolve();
    }
}

export const FETCH_HOSTELS_REQUEST = 'FETCH_HOSTELS_REQUEST';
const fetchHostelsRequest = () => ({
    type: FETCH_HOSTELS_REQUEST
});
export const FETCH_HOSTELS_SUCCESS = 'FETCH_HOSTELS_SUCCESS';
const fetchHostelsSuccess = (data) => ({
    type: FETCH_HOSTELS_SUCCESS,
    data,
    receivedAt: Date.now()
});
export const FETCH_HOSTELS_FAILURE = 'FETCH_HOSTELS_FAILURE';
const fetchHostelsFailure = (error) => ({
    type: FETCH_HOSTELS_FAILURE, error
});
const fetchHostels = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchHostelsRequest());
        return fetch(`${config.api_url}/api/v1/bookings/hostels?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchHostelsSuccess(json)))
            .catch(error => dispatch(fetchHostelsFailure(error)))
    }
};
function shouldFetchHostels(state) {
    if (state.hostels.isFetching) {
        return false
    }
    return true;
}
export const fetchHostelsIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchHostels(getState())) {
            return dispatch(fetchHostels(type, page, headers))
        }
        return Promise.resolve();
    }
}

export const FETCH_PLANES_REQUEST = 'FETCH_PLANES_REQUEST';
const fetchPlanesRequest = () => ({
    type: FETCH_PLANES_REQUEST
});
export const FETCH_PLANES_SUCCESS = 'FETCH_PLANES_SUCCESS';
const fetchPlanesSuccess = (data) => ({
    type: FETCH_PLANES_SUCCESS,
    data,
    receivedAt: Date.now()
});
export const FETCH_PLANES_FAILURE = 'FETCH_PLANES_FAILURE';
const fetchPlanesFailure = (error) => ({
    type: FETCH_PLANES_FAILURE, error
});
const fetchPlanes = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchPlanesRequest());
        return fetch(`${config.api_url}/api/v1/bookings/planes?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchPlanesSuccess(json)))
            .catch(error => dispatch(fetchPlanesFailure(error)))
    }
};
function shouldFetchPlanes(state) {
    if (state.planes.isFetching) {
        return false
    }
    return true;
}
export const fetchPlanesIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchPlanes(getState())) {
            return dispatch(fetchPlanes(type, page, headers))
        }
        return Promise.resolve();
    }
}

export const FETCH_TRAINS_REQUEST = 'FETCH_TRAINS_REQUEST';
const fetchTrainsRequest = () => ({
    type: FETCH_TRAINS_REQUEST
});
export const FETCH_TRAINS_SUCCESS = 'FETCH_TRAINS_SUCCESS';
const fetchTrainsSuccess = (data) => ({
    type: FETCH_TRAINS_SUCCESS,
    data,
    receivedAt: Date.now()
});
export const FETCH_TRAINS_FAILURE = 'FETCH_TRAINS_FAILURE';
const fetchTrainsFailure = (error) => ({
    type: FETCH_TRAINS_FAILURE, error
});
const fetchTrains = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchTrainsRequest());
        return fetch(`${config.api_url}/api/v1/bookings/trains?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchTrainsSuccess(json)))
            .catch(error => dispatch(fetchTrainsFailure(error)))
    }
};
function shouldFetchTrains(state) {
    if (state.trains.isFetching) {
        return false
    }
    return true;
}
export const fetchTrainsIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchTrains(getState())) {
            return dispatch(fetchTrains(type, page, headers))
        }
        return Promise.resolve();
    }
}

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
