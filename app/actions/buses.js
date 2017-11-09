import {getBookings} from '../services/bookingServices';

export const BUSES_REQUEST = 'BUSES_REQUEST';
export const BUSES_SUCCESS = 'BUSES_SUCCESS';
export const BUSES_FAILURE = 'BUSES_FAILURE';

export const fetchBusesIfNeeded = (type, page) => {
    return (dispatch, getState) => {
        const {auth: {token}, buses: {isFetching}} = getState();
        if (isFetching) {
            return Promise.resolve();
        }
        dispatch(fetchBusesRequest());
        return getBookings(token, 'buses', type, page)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchBusesSuccess(json)))
            .catch(error => dispatch(fetchBusesFailure(error)));
    };
};
const fetchBusesRequest = () => ({type: BUSES_REQUEST});
const fetchBusesSuccess = data => ({type: BUSES_SUCCESS, data, receivedAt: Date.now()});
const fetchBusesFailure = error => ({type: BUSES_FAILURE, error});
