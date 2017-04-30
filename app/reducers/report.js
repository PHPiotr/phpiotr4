import {FETCH_REPORT_REQUEST, FETCH_REPORT_SUCCESS, FETCH_REPORT_FAILURE} from '../actions';

const initialState = {
    total_cost: 0,
    buses: [],
    buses_avg: 0,
    buses_cost: 0,
    buses_singles_quantity: 0,
    planes: [],
    planes_avg: 0,
    planes_cost: 0,
    planes_singles_quantity: 0,
    trains: [],
    trains_avg: 0,
    trains_cost: 0,
    trains_singles_quantity: 0,
    hostels: [],
    hostels_avg: 0,
    hostels_cost: 0,
    isFetching: false
};

const report = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REPORT':
            return {...state, ...action.data};
        case FETCH_REPORT_REQUEST:
            return {...state, isFetching: true};
        case FETCH_REPORT_SUCCESS:
            return {...state, ...action.data, ...{isFetching: false, receivedAt: action.receivedAt}};
        case FETCH_REPORT_FAILURE:
            return {...state, ...{isFetching: false, error: action.error}};
        default:
            return state;
    }
};

export default report;