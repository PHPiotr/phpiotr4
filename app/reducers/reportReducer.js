import * as reportActionTypes from '../actions/report/reportActionTypes';

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
    isFetching: false,
    busesDetailsOpen: false,
    planesDetailsOpen: false,
    trainsDetailsOpen: false,
    hostelsDetailsOpen: false,
};

const report = (state = initialState, action) => {
    switch (action.type) {
    case reportActionTypes.REPORT_REQUEST:
        return {...state, isFetching: true};
    case reportActionTypes.REPORT_SUCCESS:
        return {...state, ...action.data, ...{isFetching: false, receivedAt: action.receivedAt}};
    case reportActionTypes.REPORT_FAILURE:
        return {...state, ...{isFetching: false, error: action.error}};
    case reportActionTypes.TOGGLE_DETAILS_OPEN:
        return {...state, [`${action.payload}DetailsOpen`]: !state[`${action.payload}DetailsOpen`]};
    default:
        return state;
    }
};

export default report;