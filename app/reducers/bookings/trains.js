import {FETCH_TRAINS_REQUEST, FETCH_TRAINS_SUCCESS, FETCH_TRAINS_FAILURE} from '../../actions';

const initialState = {
    isFetching: false,
};

const trains = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRAINS_REQUEST:
            return {...state, isFetching: true};
        case FETCH_TRAINS_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case FETCH_TRAINS_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default trains;