import * as hostelsActionTypes from '../actions/hostels/hostelsActionTypes';

const initialState = {
    isFetching: false,
    data: {},
    current: {},
};

const hostels = (state = initialState, action) => {
    switch (action.type) {
    case hostelsActionTypes.HOSTELS_REQUEST:
        return {...state, isFetching: true};
    case hostelsActionTypes.HOSTELS_SUCCESS:
        return {
            ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt},
        };
    case hostelsActionTypes.HOSTELS_FAILURE:
        return {...state, ...{isFetching: false, error: action.error}};
    case hostelsActionTypes.ADD_HOSTEL_REQUEST:
    case hostelsActionTypes.ADD_HOSTEL_SUCCESS:
    case hostelsActionTypes.ADD_HOSTEL_FAILURE:
    default:
        return state;
    }
};

export default hostels;