import * as trainsActionTypes from '../actions/trains/trainsActionTypes';

const initialState = {
    isFetching: false,
    data: {},
    current: {},
};

const trains = (state = initialState, action) => {
    switch (action.type) {
    case trainsActionTypes.TRAINS_REQUEST:
        return {...state, isFetching: true};
    case trainsActionTypes.TRAINS_SUCCESS:
        return {...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}};
    case trainsActionTypes.TRAINS_FAILURE:
        return {...state, ...{isFetching: false, error: action.error}};
    case trainsActionTypes.ADD_TRAIN_REQUEST:
    case trainsActionTypes.ADD_TRAIN_SUCCESS:
    case trainsActionTypes.ADD_TRAIN_FAILURE:
    default:
        return state;
    }
};

export default trains;