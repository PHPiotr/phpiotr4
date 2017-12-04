import * as reportActionTypes from '../actions/report/reportActionTypes';

const initialState = {
    totalCost: 0,
    buses: [],
    busesAvg: 0,
    busesCost: 0,
    busesSinglesQuantity: 0,
    planes: [],
    planesAvg: 0,
    planesCost: 0,
    planesSinglesQuantity: 0,
    trains: [],
    trainsAvg: 0,
    trainsCost: 0,
    trainsSinglesQuantity: 0,
    hostels: [],
    hostelsAvg: 0,
    hostelsCost: 0,
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