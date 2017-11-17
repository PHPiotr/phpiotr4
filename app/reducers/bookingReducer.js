import * as indexActionTypes from '../actions/booking/bookingActionTypes';

const initialBooking = {
    isAdd: false,
    isAdded: false,
    isAdding: false,
    isFetching: false,
    data: {},
    message: '',
    errors: {},
    error: {},
    current: {},
};

const initialState = {

    bus: {...initialBooking},
    plane: {...initialBooking},
    train: {...initialBooking},
    hostel: {...initialBooking},
};

const bookings = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
    case indexActionTypes.SET_BOOKING:
        let newCurrent = {...state[action.bookingLabelSingular]['current'], [action.fieldName]: action.fieldValue};
        return {...state, [action.bookingLabelSingular]: {...state[action.bookingLabelSingular], current: newCurrent}};

    case indexActionTypes.SET_BOOKING_ERROR_MESSAGE:
        return {...state, [payload.label]: {...state[payload.label], message: payload.message}};

    case indexActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE:
        const newErrors = {...state[payload.label]['errors'], [payload.name]: payload.value};
        const newBooking = {...state[payload.label], errors: newErrors};
        return {...state, [payload.label]: newBooking};

    case indexActionTypes.ADD_BOOKING_REQUEST:
        return {...state, [payload.label]: {...state[payload.label], isAdding: true}};

    case indexActionTypes.ADD_BOOKING_SUCCESS:
        return {...state, [payload.label]: {...state[payload.label], isAdded: true, isAdding: false, current: {}}};

    case indexActionTypes.ADD_BOOKING_FAILURE:
        const {error: {message, errors}} = payload;
        return {...state, [payload.label]: {...state[payload.label], isAdding: false, message: message || '', errors: errors || {}}};

    case indexActionTypes.GET_BOOKINGS_REQUEST:
        return {...state, [payload.label]: {...state[payload.label], isFetching: true}};

    case indexActionTypes.GET_BOOKINGS_SUCCESS:
        return {...state, [payload.label]: {...state[payload.label], isFetching: false, data: payload.data}};

    case indexActionTypes.GET_BOOKINGS_FAILURE:
        return {...state, [payload.label]: {...state[payload.label], isFetching: false, error: payload.error}};

    case indexActionTypes.SET_IS_ADDED:
        let {isAdded} = payload;
        return {...state, [payload.label]: {...state[payload.label], isAdded}};

    case indexActionTypes.SET_IS_ADD:
        const bookingIsAdd = {...state[action.bookingLabelSingular], isAdd: action.isAdd};
        return {...state, [action.bookingLabelSingular]: bookingIsAdd};
    default:
        return state;
    }
};

export default bookings;