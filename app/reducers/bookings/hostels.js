import {FETCH_HOSTELS_REQUEST, FETCH_HOSTELS_SUCCESS, FETCH_HOSTELS_FAILURE} from '../../actions';

const initialState = {
    isFetching: false,
};

const hostels = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOSTELS_REQUEST:
            return {...state, isFetching: true};
        case FETCH_HOSTELS_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case FETCH_HOSTELS_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default hostels;