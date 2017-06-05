import fetch from 'isomorphic-fetch';

export const TRAINS_REQUEST = 'TRAINS_REQUEST';
export const TRAINS_SUCCESS = 'TRAINS_SUCCESS';
export const TRAINS_FAILURE = 'TRAINS_FAILURE';

const shouldFetchTrains = (state) => {
    if (state.trains.isFetching) {
        return false
    }
    return true;
};

const fetchTrainsRequest = () => ({
    type: TRAINS_REQUEST
});

const fetchTrainsSuccess = (data) => ({
    type: TRAINS_SUCCESS,
    data,
    receivedAt: Date.now()
});

const fetchTrainsFailure = (error) => ({
    type: TRAINS_FAILURE, error
});

const fetchTrains = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchTrainsRequest());
        return fetch(`${process.env.API_URL}/api/v1/bookings/trains?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchTrainsSuccess(json)))
            .catch(error => dispatch(fetchTrainsFailure(error)))
    }
};

export const fetchTrainsIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchTrains(getState())) {
            return dispatch(fetchTrains(type, page, headers))
        }
        return Promise.resolve();
    }
};