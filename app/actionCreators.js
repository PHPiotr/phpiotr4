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

export const getReport = (data) => ({
    type: 'GET_REPORT',
    data,
});

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
