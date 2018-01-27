import * as profileActionTypes from '../actions/profile/profileActionTypes';
import {LOGOUT} from '../actions/auth/authActionTypes';

const initialState = {
    isFetching: false,
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.GET_PROFILE_REQUEST:
            return {...state, isFetching: true};
        case profileActionTypes.GET_PROFILE_SUCCESS:
            return {...state, isFetching: false, ...action.payload};
        case profileActionTypes.GET_PROFILE_FAILURE:
            return {...state, isFetching: false, ...action.payload};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default profile;
