import {FETCH_PLANES_REQUEST, FETCH_PLANES_SUCCESS, FETCH_PLANES_FAILURE} from '../../actions';

const initialState = {
    isFetching: false,
};

const planes = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLANES_REQUEST:
            return {...state, isFetching: true};
        case FETCH_PLANES_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case FETCH_PLANES_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default planes;