import * as dateFilterActionTypes from '../actions/dateFilter/dateFilterActionTypes';

const initialState = {
    fromDate: '',
    toDate: '',
    isDateFilterEnabled: false,
};

const dateFilter = (state = initialState, {type, payload}) => {
    switch (type) {
        case dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED:
            return {...state, isDateFilterEnabled: payload};
        case dateFilterActionTypes.SET_DATE:
            return {...state, [payload.name]: payload.value};
        default:
            return state;
    }
};

export default dateFilter;