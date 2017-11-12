import * as planesActionTypes from '../actions/planes/planesActionTypes';

const initialState = {
    isFetching: false,
    data: {},
    current: {},
};

const planes = (state = initialState, action) => {
    switch (action.type) {
    case planesActionTypes.PLANES_REQUEST:
        return {...state, isFetching: true};
    case planesActionTypes.PLANES_SUCCESS:
        return {...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}};
    case planesActionTypes.PLANES_FAILURE:
        return {...state, ...{isFetching: false, error: action.error}};
    case planesActionTypes.ADD_PLANE_REQUEST:
    case planesActionTypes.ADD_PLANE_SUCCESS:
    case planesActionTypes.ADD_PLANE_FAILURE:
    default:
        return state;
    }
};

export default planes;