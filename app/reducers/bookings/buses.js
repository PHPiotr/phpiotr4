import {FETCH_BUSES_REQUEST, FETCH_BUSES_SUCCESS, FETCH_BUSES_FAILURE} from '../../actions';

const initialState = {
    isFetching: false,
};

const buses = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSES_REQUEST:
            return {...state, isFetching: true};
        case FETCH_BUSES_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case FETCH_BUSES_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default buses;