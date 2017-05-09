import {HOSTELS_REQUEST, HOSTELS_SUCCESS, HOSTELS_FAILURE} from '../../actions/hostels';

const initialState = {
    isFetching: false,
};

const hostels = (state = initialState, action) => {
    switch (action.type) {
        case HOSTELS_REQUEST:
            return {...state, isFetching: true};
        case HOSTELS_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case HOSTELS_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default hostels;