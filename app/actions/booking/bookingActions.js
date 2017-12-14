import {postBookings, putBookings, getBookings, getBooking, deleteBooking} from '../../services/bookingServices';
import * as bookingActionTypes from './bookingActionTypes';

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
    type: bookingActionTypes.SET_BOOKING_PROPERTY,
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
                if (response.ok) {
                    return dispatch(addBookingSuccess({label: singular}));
                }
                return response.json();
            })
            .then((json) => {
                if (json.error && json.errors) {
                    dispatch(addBookingFailure({label: singular, error: json.error, errors: json.errors}));
                }
            })
            .catch(error => dispatch(addBookingFailure({label: singular, error: error.message, errors: {}})));
    };
};
const addBookingRequest = payload => ({type: bookingActionTypes.ADD_BOOKING_REQUEST, payload});
const addBookingSuccess = payload => ({type: bookingActionTypes.ADD_BOOKING_SUCCESS, payload});
const addBookingFailure = payload => ({type: bookingActionTypes.ADD_BOOKING_FAILURE, payload});

export const editBookingIfNeeded = (singular, plural) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const bookingSingular = bookings[singular];
        if (bookingSingular.isAdding) {
            return Promise.resolve();
        }
        const current = {...bookingSingular.current};
        const id = current._id;
        delete current._id;
        dispatch(editBookingRequest({label: singular}));
        return putBookings(token, plural, id, JSON.stringify(current))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return dispatch(editBookingSuccess({label: singular}));
            })
            .catch(error => dispatch(editBookingFailure({label: singular, error})));
    };
};
const editBookingRequest = payload => ({type: bookingActionTypes.EDIT_BOOKING_REQUEST, payload});
const editBookingSuccess = payload => ({type: bookingActionTypes.EDIT_BOOKING_SUCCESS, payload});
const editBookingFailure = payload => ({type: bookingActionTypes.EDIT_BOOKING_FAILURE, payload});

export const deleteBookingIfNeeded = (singular, plural, id) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const bookingSingular = bookings[singular];
        if (bookingSingular.isDeleting) {
            return Promise.resolve();
        }
        dispatch(deleteBookingRequest({label: singular}));
        return deleteBooking(token, plural, id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return dispatch(deleteBookingSuccess({label: singular}));
            })
            .catch(error => dispatch(deleteBookingFailure({label: singular, error})));
    };
};
const deleteBookingRequest = payload => ({type: bookingActionTypes.DELETE_BOOKING_REQUEST, payload});
const deleteBookingSuccess = payload => ({type: bookingActionTypes.DELETE_BOOKING_SUCCESS, payload});
const deleteBookingFailure = payload => ({type: bookingActionTypes.DELETE_BOOKING_FAILURE, payload});

export const getBookingIfNeeded = (singular, plural, id) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const bookingSingular = bookings[singular];
        if (bookingSingular.isFetching) {
            return Promise.resolve();
        }
        dispatch(getBookingRequest({label: singular}));
        return getBooking(token, plural, id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then((json) => {
                return {
                    ...json,
                    price: json.price ? (parseFloat(json.price)).toFixed(2) : null,
                    departure_date: json.departure_date ? json.departure_date.substring(0, 10) : null,
                    return_departure_date: json.return_departure_date ? json.return_departure_date.substring(0, 10) : null,
                    checkin_date: json.checkin_date ? json.checkin_date.substring(0, 10) : null,
                    checkout_date: json.checkout_date ? json.checkout_date.substring(0, 10) : null,
                    departure_time: json.departure_time ? (json.departure_time.indexOf(':') === -1 ? json.departure_time.substring(0, 2) + ':' + json.departure_time.substring(2, json.departure_time.length) : json.departure_time) : null,
                    arrival_time: json.arrival_time ? (json.arrival_time.indexOf(':') === -1 ? json.arrival_time.substring(0, 2) + ':' + json.arrival_time.substring(2, json.arrival_time.length) : json.arrival_time) : null,
                    return_departure_time: json.return_departure_time ? (json.return_departure_time.indexOf(':') === -1 ? json.return_departure_time.substring(0, 2) + ':' + json.return_departure_time.substring(2, json.return_departure_time.length) : json.return_departure_time) : null,
                    return_arrival_time: json.return_arrival_time ? (json.return_arrival_time.indexOf(':') === -1 ? json.return_arrival_time.substring(0, 2) + ':' + json.return_arrival_time.substring(2, json.return_arrival_time.length) : json.return_arrival_time) : null,
                };
            })
            .then(json => dispatch(getBookingSuccess({label: singular, current: json})))
            .catch(error => dispatch(getBookingFailure({label: singular, error})));
    };
};
const getBookingRequest = payload => ({type: bookingActionTypes.GET_BOOKING_REQUEST, payload});
const getBookingSuccess = payload => ({type: bookingActionTypes.GET_BOOKING_SUCCESS, payload});
const getBookingFailure = payload => ({type: bookingActionTypes.GET_BOOKING_FAILURE, payload});

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