import * as busesActionTypes from '../actions/buses/busesActionTypes';

const initialState = {
    isFetching: false,
    data: {},
    current: {},
};

const buses = (state = initialState, action) => {
    switch (action.type) {
    case busesActionTypes.BUSES_REQUEST:
        return {...state, isFetching: true};
    case busesActionTypes.BUSES_SUCCESS:
        return {...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}};
    case busesActionTypes.BUSES_FAILURE:
        return {...state, ...{isFetching: false, error: action.error}};
    case busesActionTypes.ADD_BUS_REQUEST:
    case busesActionTypes.ADD_BUS_SUCCESS:
    case busesActionTypes.ADD_BUS_FAILURE:
    default:
        return state;
    }
};

export default buses;