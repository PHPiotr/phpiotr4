import {PLANES_REQUEST, PLANES_SUCCESS, PLANES_FAILURE} from '../../actions/planes';

const initialState = {
    isFetching: false,
};

const planes = (state = initialState, action) => {
    switch (action.type) {
        case PLANES_REQUEST:
            return {...state, isFetching: true};
        case PLANES_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case PLANES_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default planes;