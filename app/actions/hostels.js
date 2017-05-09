import fetch from 'isomorphic-fetch';
import {api_url} from '../../config';

export const HOSTELS_REQUEST = 'HOSTELS_REQUEST';
export const HOSTELS_SUCCESS = 'HOSTELS_SUCCESS';
export const HOSTELS_FAILURE = 'HOSTELS_FAILURE';

const shouldFetchHostels = (state) => {
    if (state.hostels.isFetching) {
        return false
    }
    return true;
};

const fetchHostelsRequest = () => ({
    type: HOSTELS_REQUEST
});

const fetchHostelsSuccess = (data) => ({
    type: HOSTELS_SUCCESS,
    data,
    receivedAt: Date.now()
});

const fetchHostelsFailure = (error) => ({
    type: HOSTELS_FAILURE, error
});

const fetchHostels = (type, page, headers) => {
    return (dispatch) => {
        dispatch(fetchHostelsRequest());
        return fetch(`${api_url}/api/v1/bookings/hostels?type=${type}&page=${page}`, {headers})
            .then(response => response.json())
            .then(json => dispatch(fetchHostelsSuccess(json)))
            .catch(error => dispatch(fetchHostelsFailure(error)))
    }
};

export const fetchHostelsIfNeeded = (type, page, headers) => {
    return (dispatch, getState) => {
        if (shouldFetchHostels(getState())) {
            return dispatch(fetchHostels(type, page, headers))
        }
        return Promise.resolve();
    }
};