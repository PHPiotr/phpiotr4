import {BUSES_REQUEST, BUSES_SUCCESS, BUSES_FAILURE} from '../../actions/buses';

const initialState = {
    isFetching: false,
};

const buses = (state = initialState, action) => {
    switch (action.type) {
        case BUSES_REQUEST:
            return {...state, isFetching: true};
        case BUSES_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case BUSES_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default buses;