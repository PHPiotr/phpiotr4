import {postBookings} from '../services/bookingServices';

export const ADD_BOOKING_REQUEST = 'ADD_BOOKING_REQUEST';
export const ADD_BOOKING_SUCCESS = 'ADD_BOOKING_SUCCESS';
export const ADD_BOOKING_FAILURE = 'ADD_BOOKING_FAILURE';
export const SET_IS_ADD = 'SET_IS_ADD';
export const SET_IS_ADDED = 'SET_IS_ADDED';
export const SET_BOOKING = 'SET_BOOKING';
export const SET_BOOKING_ERROR_MESSAGE = 'SET_BOOKING_ERROR_MESSAGE';
export const SET_BOOKING_FIELD_ERROR_MESSAGE = 'SET_BOOKING_FIELD_ERROR_MESSAGE';
export const TOGGLE_DATE_FILTER_ENABLED = 'TOGGLE_DATE_FILTER_ENABLED';
export const SET_DATE = 'SET_DATE';

export const setBooking = (bookingLabelSingular, fieldName, fieldValue) => ({
    type: SET_BOOKING,
    bookingLabelSingular,
    fieldName,
    fieldValue,
});
export const setIsAdded = payload => ({type: SET_IS_ADDED, payload});
export const setBookingErrorMessage = payload => ({type: SET_BOOKING_ERROR_MESSAGE, payload});
export const setBookingFieldErrorMessage = payload => ({type: SET_BOOKING_FIELD_ERROR_MESSAGE, payload});

export const toggleDateFilterEnabled = isDateFilterEnabled => ({
    type: TOGGLE_DATE_FILTER_ENABLED,
    isDateFilterEnabled,
});
export const setDate = (dateFieldName, dateFieldValue) => ({
    type: SET_DATE,
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
        dispatch(addBookingRequest(singular));
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
const addBookingRequest = bookingSingularLabel => ({
    type: ADD_BOOKING_REQUEST,
    bookingSingularLabel,
});
const addBookingSuccess = payload => ({type: ADD_BOOKING_SUCCESS, payload});
const addBookingFailure = payload => ({type: ADD_BOOKING_FAILURE, payload});

export const setIsAdd = (isAdd, bookingLabelSingular) => ({
    type: SET_IS_ADD,
    isAdd,
    bookingLabelSingular,
});