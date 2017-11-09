import {getBookings} from '../services/bookingServices';

export const TRAINS_REQUEST = 'TRAINS_REQUEST';
export const TRAINS_SUCCESS = 'TRAINS_SUCCESS';
export const TRAINS_FAILURE = 'TRAINS_FAILURE';

export const fetchTrainsIfNeeded = (type, page) => {
    return (dispatch, getState) => {
        const {auth: {token}, trains: {isFetching}} = getState();
        if (isFetching) {
            return Promise.resolve();
        }
        dispatch(fetchTrainsRequest());
        return getBookings(token, 'trains', type, page)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchTrainsSuccess(json)))
            .catch(error => dispatch(fetchTrainsFailure(error)));
    };
};
const fetchTrainsRequest = () => ({type: TRAINS_REQUEST});
const fetchTrainsSuccess = data => ({type: TRAINS_SUCCESS, data, receivedAt: Date.now()});
const fetchTrainsFailure = error => ({type: TRAINS_FAILURE, error});
