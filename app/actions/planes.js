import {getBookings} from '../services/bookingServices';

export const PLANES_REQUEST = 'PLANES_REQUEST';
export const PLANES_SUCCESS = 'PLANES_SUCCESS';
export const PLANES_FAILURE = 'PLANES_FAILURE';

export const fetchPlanesIfNeeded = (type, page) => {
    return (dispatch, getState) => {
        const {auth: {token}, planes: {isFetching}} = getState();
        if (isFetching) {
            return Promise.resolve();
        }
        dispatch(fetchPlanesRequest());
        return getBookings(token, 'planes', type, page)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchPlanesSuccess(json)))
            .catch(error => dispatch(fetchPlanesFailure(error)));
    };
};
const fetchPlanesRequest = () => ({type: PLANES_REQUEST});
const fetchPlanesSuccess = data => ({type: PLANES_SUCCESS, data, receivedAt: Date.now()});
const fetchPlanesFailure = error => ({type: PLANES_FAILURE, error});
