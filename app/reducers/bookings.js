const initialState = {
    buses: {},
    planes: {},
    trains: {},
    hostels: {},

    bus: {},
    plane: {},
    train: {},
    hostel: {},

    busErrorMessage: '',
    planeErrorMessage: '',
    trainErrorMessage: '',
    hostelErrorMessage: '',

    busErrors: {},
    planeErrors: {},
    trainErrors: {},
    hostelErrors: {},

    planeInserted: {},
    busInserted: {},
    trainInserted: {},
    hostelInserted: {},
}

const bookings = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOKINGS':
            return {...state, [action.bookingLabelPlural]: action.data};

        case 'SET_BOOKING':
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
            console.log('action wtf: ', action, state);
            let inputError = { ...state[`${action.bookingLabelSingular}Errors`], [action.fieldName]: action.errorsValue};
            return {...state, [`${action.bookingLabelSingular}Errors`]: inputError};

        case 'SET_BOOKING_ERRORS':
            return {...state, [`${action.bookingLabelSingular}Errors`]: action.errorsValue};

        case 'SET_BOOKING_INSERTED':
            return {...initialState, [`${action.bookingLabelSingular}Inserted`]: action.bookingInserted};

        default:
            return state;
    }
};

export default bookings;