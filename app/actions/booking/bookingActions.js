import {postBookings, putBookings, getBookings, getBooking} from '../../services/bookingServices';
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
            .then(json => {
                return {
                    ...json,
                    price: json.price ? (parseFloat(json.price)).toFixed(2) : null,
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