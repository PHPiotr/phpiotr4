import {TOGGLE_DATE_FILTER_ENABLED, SET_DATE} from '../actions/booking/bookingActionTypes';

const initialState = {
    fromDate: '',
    toDate: '',
    isDateFilterEnabled: false,
};

const dateFilter = (state = initialState, {type, payload}) => {
    switch (type) {
    case TOGGLE_DATE_FILTER_ENABLED:
        return {...state, isDateFilterEnabled: payload};
    case SET_DATE:
        return {...state, [payload.name]: payload.value};
    default:
        return state;
    }
};

export default dateFilter;