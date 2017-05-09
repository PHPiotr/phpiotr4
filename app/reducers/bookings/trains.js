import {TRAINS_REQUEST, TRAINS_SUCCESS, TRAINS_FAILURE} from '../../actions/trains';

const initialState = {
    isFetching: false,
};

const trains = (state = initialState, action) => {
    switch (action.type) {
        case TRAINS_REQUEST:
            return {...state, isFetching: true};
        case TRAINS_SUCCESS:
            return {
                ...state, ...{data: action.data}, ...{isFetching: false, receivedAt: action.receivedAt}
            };
        case TRAINS_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default trains;