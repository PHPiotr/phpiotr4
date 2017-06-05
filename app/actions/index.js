import fetch from 'isomorphic-fetch';
import config from '../../config';

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

export const handleFocus = (event, bookingLabelSingular) => {
    return (dispatch) => {
        dispatch(setBookingErrorMessage(bookingLabelSingular, ''));
        dispatch(setBookingInputError(bookingLabelSingular, undefined, event.target.name));
        return Promise.resolve();
    }
};

export const handleChange = (event, bookingLabelSingular) => {
    return (dispatch) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        dispatch(setBooking(bookingLabelSingular, name, value));

        return Promise.resolve();
    }
};

export const ADD_BOOKING_REQUEST = 'ADD_BOOKING_REQUEST';
const addBookingRequest = (bookingSingularLabel) => ({
    type: ADD_BOOKING_REQUEST,
    bookingSingularLabel
});
export const ADD_BOOKING_SUCCESS = 'ADD_BOOKING_SUCCESS';
const addBookingSuccess = (data, bookingSingularLabel) => ({
    type: ADD_BOOKING_SUCCESS,
    data,
    bookingSingularLabel
});
export const ADD_BOOKING_FAILURE = 'ADD_BOOKING_FAILURE';
const addBookingFailure = (error, bookingSingularLabel) => ({
    type: ADD_BOOKING_FAILURE,
    error,
    bookingSingularLabel
});

const addBooking = (event, singular, plural, headers) => {
    event.preventDefault();
    return (dispatch, getState) => {
        dispatch(addBookingRequest(singular));

        fetch(`${process.env.API_URL}/api/v1/bookings/${plural}`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(getState().bookings[singular])
        })
            .then(response => response.json())
            .then(json => {
                dispatch(addBookingSuccess(json, singular));

                if (json.ok) {
                    return dispatch(setBookingInserted(singular, json[singular]));
                }
                if (json.err) {
                    dispatch(setBookingErrorMessage(singular, json.err.message));
                    dispatch(setBookingErrors(singular, json.err.errors));
                }
            })
            .catch(error => dispatch(addBookingFailure(error)))

        return Promise.resolve();
    }
};

function shouldAddBooking(state, singular) {
    // if (state.bookings[singular].isFetching) {
    //     return false
    // }
    return true;
}
export const addBookingIfNeeded = (event, singular, plural, headers) => {
    return (dispatch, getState) => {
        if (shouldAddBooking(getState(), singular)) {
            return dispatch(addBooking(event, singular, plural, headers))
        }
        return Promise.resolve();
    }
}

export const SET_IS_ADD = 'SET_IS_ADD';
export const setIsAdd = (isAdd, bookingLabelSingular) => ({
    type: SET_IS_ADD,
    isAdd,
    bookingLabelSingular
});