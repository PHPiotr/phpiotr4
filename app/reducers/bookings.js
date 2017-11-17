import * as indexActionTypes from '../actions/index';

const initialState = {

    bus: {
        isAdd: false,
        isAdded: false,
        message: '',
        errors: {},
        current: {},
    },
    plane: {
        isAdd: false,
        isAdded: false,
        message: '',
        errors: {},
        current: {},
    },
    train: {
        isAdd: false,
        isAdded: false,
        message: '',
        errors: {},
        current: {},
    },
    hostel: {
        isAdd: false,
        isAdded: false,
        message: '',
        errors: {},
        current: {},
    },
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

    case indexActionTypes.ADD_BOOKING_SUCCESS:
        return {...state, [payload.label]: {...state[payload.label], isAdded: true, current: {}}};

    case indexActionTypes.ADD_BOOKING_FAILURE:
        const {error: {message, errors}} = payload;
        return {...state, [payload.label]: {...state[payload.label], message: message || '', errors: errors || {}}};

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