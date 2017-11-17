import {SET_IS_ADD, SET_BOOKING_INSERTED, SET_BOOKING} from '../actions/index';

const initialState = {

    bus: {
        isAdd: false,
        isAdded: false,
    },
    plane: {
        isAdd: false,
        isAdded: false,
    },
    train: {
        isAdd: false,
        isAdded: false,
    },
    hostel: {
        isAdd: false,
        isAdded: false,
    },

    busErrorMessage: '',
    planeErrorMessage: '',
    trainErrorMessage: '',
    hostelErrorMessage: '',

    busErrors: {},
    planeErrors: {},
    trainErrors: {},
    hostelErrors: {},
};

const bookings = (state = initialState, action) => {
    switch (action.type) {
    case SET_BOOKING:
        let booking = {...state[action.bookingLabelSingular], [action.fieldName]: action.fieldValue};
        return {...state, [action.bookingLabelSingular]: booking};

    case 'SET_BOOKING_ERROR_MESSAGE':
        let errorMessageType = `${action.bookingLabelSingular}ErrorMessage`;
        let errorMessageValue = action.errorMessageValue;
        if (state[errorMessageType] === errorMessageValue) {
            return state;
        }
        return {...state, [errorMessageType]: errorMessageValue};

    case 'SET_BOOKING_INPUT_ERROR':
        let inputError = { ...state[`${action.bookingLabelSingular}Errors`], [action.fieldName]: action.errorsValue};
        return {...state, [`${action.bookingLabelSingular}Errors`]: inputError};

    case 'SET_BOOKING_ERRORS':
        return {...state, [`${action.bookingLabelSingular}Errors`]: action.errorsValue};

    case SET_BOOKING_INSERTED:
        const {payload: {label, isAdded}} = action;
        return {...state, [label]: {...state[label], isAdded}};

    case SET_IS_ADD:
        let bookingIsAdd = {...state[action.bookingLabelSingular], isAdd: action.isAdd};
        return {...state, [action.bookingLabelSingular]: bookingIsAdd};
    default:
        return state;
    }
};

export default bookings;