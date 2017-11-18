import {postBookings, getBookings} from '../../services/bookingServices';
import * as bookingActionTypes from './bookingActionTypes';

export const toggleDateFilterEnabled = isDateFilterEnabled => ({
    type: bookingActionTypes.TOGGLE_DATE_FILTER_ENABLED,
    isDateFilterEnabled,
});
export const setDate = (dateFieldName, dateFieldValue) => ({
    type: bookingActionTypes.SET_DATE,
    dateFieldName,
    dateFieldValue,
});

export const setIsAdded = payload => ({type: bookingActionTypes.SET_IS_ADDED, payload});
export const setBookingErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_ERROR_MESSAGE, payload});
export const setBookingFieldErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE, payload});

export const handleFocus = ({target: {name}}, label) => {
    return (dispatch, getState) => {
        const {bookings: {[label]: {message, errors}}} = getState();
        if (message) {
            dispatch(setBookingErrorMessage({label, message: ''}));
        }
        const errorsName = errors[name];
        if (errorsName && errorsName.message) {
            dispatch(setBookingFieldErrorMessage({label, name, value: null}));
        }
        return Promise.resolve();
    };
};

export const handleChange = ({target: {name, type, checked, value}}, label) => ({
    type: bookingActionTypes.SET_BOOKING,
    payload: {label, name, value: type === 'checkbox' ? checked : value},
});

export const setIsAdd = payload => ({type: bookingActionTypes.SET_IS_ADD, payload});

export const addBookingIfNeeded = (singular, plural) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const bookingSingular = bookings[singular];
        if (bookingSingular.isAdding) {
            return Promise.resolve();
        }
        dispatch(addBookingRequest({label: singular}));
        return postBookings(token, plural, JSON.stringify(bookingSingular.current))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then((json) => {
                if (json.ok) {
                    dispatch(addBookingSuccess({label: singular, data: json[singular]}));
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