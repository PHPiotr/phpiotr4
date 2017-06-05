import fetch from 'isomorphic-fetch';

export const PLANES_REQUEST = 'PLANES_REQUEST';
export const PLANES_SUCCESS = 'PLANES_SUCCESS';
export const PLANES_FAILURE = 'PLANES_FAILURE';

const shouldFetchPlanes = (state) => {
    if (state.planes.isFetching) {
        return false
    }
    return true;
};

const fetchPlanesRequest = () => ({
    type: PLANES_REQUEST
});

const fetchPlanesSuccess = (data) => ({
    type: PLANES_SUCCESS,
    data,
    receivedAt: Date.now()
});

const fetchPlanesFailure = (error) => ({
    type: PLANES_FAILURE, error
});

const fetchPlanes = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchPlanesRequest());
        return fetch(`${process.env.API_URL}/api/v1/bookings/planes?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchPlanesSuccess(json)))
            .catch(error => dispatch(fetchPlanesFailure(error)))
    }
};

export const fetchPlanesIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchPlanes(getState())) {
            return dispatch(fetchPlanes(type, page, headers))
        }
        return Promise.resolve();
    }
};