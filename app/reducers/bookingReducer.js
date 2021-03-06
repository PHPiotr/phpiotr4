import * as indexActionTypes from '../actions/booking/bookingActionTypes';
import {LOGOUT} from '../actions/auth/authActionTypes';

const initialBooking = {
    isAdd: false,
    isAdded: false,
    isAdding: false,
    isFetching: false,
    isDeleted: false,
    isDeleting: false,
    data: {},
    message: '',
    code: null,
    errors: {},
    error: {},
    current: {},
    allIds: [],
    byId: {},
};

const initialState = {
    bus: {...initialBooking},
    plane: {...initialBooking},
    train: {...initialBooking},
    hostel: {...initialBooking},
    currentBooking: {
        label: '',
        labelPlural: '',
        id: null,
    },
    isBookingDeleteDialogOpen: false,
};

const bookings = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case indexActionTypes.SET_BOOKING_PROPERTY:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    current: {...state[payload.label]['current'], [payload.name]: payload.value},
                },
            };

        case indexActionTypes.SET_BOOKING_ERROR_MESSAGE:
            return {...state, [payload.label]: {...state[payload.label], message: payload.message}};

        case indexActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    errors: {...state[payload.label]['errors'], [payload.name]: payload.value},
                },
            };

        case indexActionTypes.ADD_BOOKING_REQUEST:
            return {...state, [payload.label]: {...state[payload.label], isAdding: true}};

        case indexActionTypes.ADD_BOOKING_SUCCESS:
            return {...state, [payload.label]: {...state[payload.label], isAdded: true, isAdding: false, current: {}}};

        case indexActionTypes.ADD_BOOKING_FAILURE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isAdding: false,
                    message: payload.error,
                    errors: payload.errors,
                },
            };

        case indexActionTypes.EDIT_BOOKING_REQUEST:
            return {...state, [payload.label]: {...state[payload.label], isAdding: true}};

        case indexActionTypes.EDIT_BOOKING_SUCCESS:
            return {...state, [payload.label]: {...state[payload.label], isAdded: true, isAdding: false}};

        case indexActionTypes.EDIT_BOOKING_FAILURE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isAdding: false,
                    message: payload.error.message || '',
                    errors: payload.error.errors || {},
                },
            };

        case indexActionTypes.GET_BOOKING_REQUEST:
            return {...state, [payload.label]: {...state[payload.label], isFetching: true}};

        case indexActionTypes.GET_BOOKING_SUCCESS:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isFetching: false,
                    current: {...payload.current, price: payload.current.price ? (payload.current.price).toFixed(2) : payload.current.price},
                },
            };

        case indexActionTypes.GET_BOOKING_FAILURE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isFetching: false,
                    message: payload.message || '',
                    code: payload.code || null,
                    errors: payload.error.errors || {},
                },
            };

        case indexActionTypes.GET_BOOKINGS_REQUEST:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isFetching: true,
                    error: {},
                    code: null,
                    message: '',
                },
            };

        case indexActionTypes.GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isFetching: false,
                    data: payload.data,
                    allIds: Array.isArray(payload.data.bookings) ? payload.data.bookings.map(booking => booking._id) : [],
                    byId: Array.isArray(payload.data.bookings) ? payload.data.bookings.reduce((acc, cur) => {
                        acc[cur._id] = cur;
                        return acc;
                    }, {}) : {},
                    code: 200,
                },
            };

        case indexActionTypes.GET_BOOKINGS_FAILURE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isFetching: false,
                    error: payload.error,
                    message: payload.message || '',
                    code: payload.code || null,
                    data: {
                        ...state[payload.label].data,
                        bookings: [],
                    },
                },
            };

        case indexActionTypes.DELETE_BOOKING_REQUEST:
            return {...state, [payload.label]: {...state[payload.label], isDeleting: true}};

        case indexActionTypes.DELETE_BOOKING_SUCCESS:
            return {...state, [payload.label]: {...state[payload.label], isDeleted: true, isDeleting: false}};

        case indexActionTypes.DELETE_BOOKING_FAILURE:
            return {
                ...state,
                [payload.label]: {
                    ...state[payload.label],
                    isDeleting: false,
                    message: payload.error.message || '',
                    errors: payload.error.errors || {},
                },
            };

        case indexActionTypes.SET_IS_ADDED:
            return {...state, [payload.label]: {...state[payload.label], isAdded: payload.isAdded}};

        case indexActionTypes.SET_IS_DELETED:
            return {...state, [payload.label]: {...state[payload.label], isDeleted: payload.isDeleted}};

        case indexActionTypes.SET_IS_ADD:
            return {...state,
                [payload.label]: {
                    ...state[payload.label],
                    isAdd: payload.isAdd,
                    current: payload.isAdd ? state[payload.label]['current'] : {},
                    errors: payload.isAdd ? state[payload.label]['errors'] : {},
                    isAdded: payload.isAdd ? state.isAdded : false,
                },
            };
        case indexActionTypes.SET_CURRENT_BOOKING:
            return {...state, currentBooking: payload};
        case indexActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN:
            return {...state, isBookingDeleteDialogOpen: !state.isBookingDeleteDialogOpen};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default bookings;