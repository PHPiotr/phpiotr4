import {postBookings, putBookings, getBookings, getBooking, deleteBooking} from '../../services/bookingServices';
import * as bookingActionTypes from './bookingActionTypes';

export const setIsAdded = payload => ({type: bookingActionTypes.SET_IS_ADDED, payload});
export const setIsDeleted = payload => ({type: bookingActionTypes.SET_IS_DELETED, payload});
export const setBookingErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_ERROR_MESSAGE, payload});
export const setBookingFieldErrorMessage = payload => ({type: bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE, payload});

export const handleFocus = ({target: {name}}, label) => {
    return (dispatch, getState) => {
        const {bookings: {[label]: {message, errors}}} = getState();
        message && dispatch(setBookingErrorMessage({label, message: ''}));
        const errorsName = errors[name];
        (errorsName && errorsName.message) && dispatch(setBookingFieldErrorMessage({label, name, value: null}));
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
            });
    };
};
const addBookingRequest = payload => ({type: bookingActionTypes.ADD_BOOKING_REQUEST, payload});
const addBookingSuccess = payload => ({type: bookingActionTypes.ADD_BOOKING_SUCCESS, payload});
const addBookingFailure = payload => ({type: bookingActionTypes.ADD_BOOKING_FAILURE, payload});

export const editBookingIfNeeded = (label, plural) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const bookingSingular = bookings[label];
        if (bookingSingular.isAdding) {
            return Promise.resolve();
        }
        const current = {...bookingSingular.current};
        const id = current._id;
        delete current._id;
        dispatch(editBookingRequest({label}));
        return putBookings(token, plural, id, JSON.stringify(current))
            .then((response) => {
                if (response.ok) {
                    return dispatch(editBookingSuccess({label}));
                }
                return response.json();
            })
            .then((json) => {
                if (json.err) {
                    dispatch(editBookingFailure({label, error: json.err}));
                }
            })
            .catch(error => dispatch(editBookingFailure({label, error})));
    };
};
const editBookingRequest = payload => ({type: bookingActionTypes.EDIT_BOOKING_REQUEST, payload});
const editBookingSuccess = payload => ({type: bookingActionTypes.EDIT_BOOKING_SUCCESS, payload});
const editBookingFailure = payload => ({type: bookingActionTypes.EDIT_BOOKING_FAILURE, payload});

export const deleteBookingIfNeeded = () => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const {label, labelPlural, id} = bookings.currentBooking;
        const bookingSingular = bookings[label];
        if (bookingSingular.isDeleting) {
            return Promise.resolve();
        }
        dispatch(deleteBookingRequest({label}));
        return deleteBooking(token, labelPlural, id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return dispatch(deleteBookingSuccess({label}));
            })
            .catch(error => dispatch(deleteBookingFailure({label, error})));
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
                    throw {message: response.statusText, code: response.status};
                }
                return response.json();
            })
            .then(current => dispatch(getBookingSuccess({label: singular, current})))
            .catch((error) => {
                if (getState().auth.isLoggedIn) {
                    return dispatch(getBookingFailure({label: singular, error, message: error.message, code: error.code}));
                } else {
                    return dispatch(getBookingFailure({label: singular, error: {}, message: '', code: null}));
                }
            });
    };
};
const getBookingRequest = payload => ({type: bookingActionTypes.GET_BOOKING_REQUEST, payload});
const getBookingSuccess = payload => ({type: bookingActionTypes.GET_BOOKING_SUCCESS, payload});
const getBookingFailure = payload => ({type: bookingActionTypes.GET_BOOKING_FAILURE, payload});

export const getBookingsIfNeeded = (label, plural, type, page) => {
    return (dispatch, getState) => {
        const {bookings, auth: {token}} = getState();
        const booking = bookings[label];
        if (booking.isFetching || booking.isDeleting) {
            return Promise.resolve();
        }
        dispatch(fetchBookingsRequest({label}));
        return getBookings(token, plural, type, page)
            .then((response) => {
                if (!response.ok) {
                    throw {message: response.statusText, code: response.status};
                }
                return response.json();
            })
            .then((data) => {
                return dispatch(fetchBookingsSuccess({label, data}));
            })
            .catch((error) => {
                if (getState().auth.isLoggedIn) {
                    return dispatch(fetchBookingsFailure({label, error, message: error.message, code: error.code}));
                } else {
                    return dispatch(fetchBookingsFailure({label, error: {}, message: '', code: null}));
                }
            });
    };
};
const fetchBookingsRequest = payload => ({type: bookingActionTypes.GET_BOOKINGS_REQUEST, payload});
const fetchBookingsSuccess = payload => ({type: bookingActionTypes.GET_BOOKINGS_SUCCESS, payload});
const fetchBookingsFailure = payload => ({type: bookingActionTypes.GET_BOOKINGS_FAILURE, payload});

export const setCurrentBooking = payload => ({type: bookingActionTypes.SET_CURRENT_BOOKING, payload});
export const toggleIsBookingDeleteDialogOpen = () => ({type: bookingActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN});
