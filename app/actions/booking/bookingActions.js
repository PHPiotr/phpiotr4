import {postBookings, getBookings} from '../../services/bookingServices';
import * as bookingActionTypes from './bookingActionTypes';

export const setBooking = (bookingLabelSingular, fieldName, fieldValue) => ({
    type: bookingActionTypes.SET_BOOKING,
    bookingLabelSingular,
    fieldName,
    fieldValue,
});
export const setIsAdded = payload => ({type: bookingActionTypes.SET_IS_ADDED, payload});
export const setBookingErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_ERROR_MESSAGE, payload});
export const setBookingFieldErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE, payload});

export const toggleDateFilterEnabled = isDateFilterEnabled => ({
    type: bookingActionTypes.TOGGLE_DATE_FILTER_ENABLED,
    isDateFilterEnabled,
});
export const setDate = (dateFieldName, dateFieldValue) => ({
    type: bookingActionTypes.SET_DATE,
    dateFieldName,
    dateFieldValue,
});

export const handleFocus = ({target: {name}}, label) => {
    return (dispatch, getState) => {
        const {bookings: {[label]: {message, errors}}} = getState();
        if (message) {
            dispatch(setBookingErrorMessage({label, message: ''}));
        }
        if (errors[name] && errors[name]['message']) {
            dispatch(setBookingFieldErrorMessage({label, name, value: null}));
        }
        return Promise.resolve();
    };
};

export const handleChange = (event, bookingLabelSingular) => {
    return (dispatch) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        dispatch(setBooking(bookingLabelSingular, name, value));

        return Promise.resolve();
    };
};

export const addBookingIfNeeded = (singular, plural) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        if (bookings[singular]['isAdding']) {
            return Promise.resolve();
        }
        dispatch(addBookingRequest({label: singular}));
        return postBookings(token, plural, JSON.stringify(bookings[singular]['current']))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then((json) => {
                if (json.ok) {
                    dispatch(addBookingSuccess({label: singular, data: json}));
                }
                if (json.err) {
                    dispatch(addBookingFailure({label: singular, error: json.err}));
                }
            })
            .catch(error => dispatch(addBookingFailure({label: singular, error})));
    };
};
const addBookingRequest = payload => ({type: bookingActionTypes.ADD_BOOKING_REQUEST, payload});
const addBookingSuccess = payload => ({type: bookingActionTypes.ADD_BOOKING_SUCCESS, payload});
const addBookingFailure = payload => ({type: bookingActionTypes.ADD_BOOKING_FAILURE, payload});

export const getBookingsIfNeeded = (singular, plural, type, page) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        if (bookings[singular]['isFetching']) {
            return Promise.resolve();
        }
        dispatch(fetchBookingsRequest({label: singular}));
        return getBookings(token, plural, type, page)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchBookingsSuccess({label: singular, data: json})))
            .catch(error => dispatch(fetchBookingsFailure({label: singular, error})));
    };
};
const fetchBookingsRequest = payload => ({type: bookingActionTypes.GET_BOOKINGS_REQUEST, payload});
const fetchBookingsSuccess = payload => ({type: bookingActionTypes.GET_BOOKINGS_SUCCESS, payload});
const fetchBookingsFailure = payload => ({type: bookingActionTypes.GET_BOOKINGS_FAILURE, payload});

export const setIsAdd = (isAdd, bookingLabelSingular) => ({
    type: bookingActionTypes.SET_IS_ADD,
    isAdd,
    bookingLabelSingular,
});