import fetch from 'isomorphic-fetch';

export const BUSES_REQUEST = 'BUSES_REQUEST';
export const BUSES_SUCCESS = 'BUSES_SUCCESS';
export const BUSES_FAILURE = 'BUSES_FAILURE';

const shouldFetchBuses = (state) => {
    if (state.buses.isFetching) {
        return false
    }
    return true;
};

const fetchBusesRequest = () => ({
    type: BUSES_REQUEST
});

const fetchBusesSuccess = (data) => ({
    type: BUSES_SUCCESS,
    data,
    receivedAt: Date.now()
});

const fetchBusesFailure = (error) => ({
    type: BUSES_FAILURE, error
});

const fetchBuses = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchBusesRequest());
        return fetch(`${process.env.API_URL}/api/v1/bookings/buses?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchBusesSuccess(json)))
            .catch(error => dispatch(fetchBusesFailure(error)))
    }
};

export const fetchBusesIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchBuses(getState())) {
            return dispatch(fetchBuses(type, page, headers))
        }
        return Promise.resolve();
    }
};