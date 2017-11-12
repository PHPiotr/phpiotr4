import {getBookings} from '../../services/bookingServices';

export const HOSTELS_REQUEST = 'HOSTELS_REQUEST';
export const HOSTELS_SUCCESS = 'HOSTELS_SUCCESS';
export const HOSTELS_FAILURE = 'HOSTELS_FAILURE';

export const fetchHostelsIfNeeded = (type, page) => {
    return (dispatch, getState) => {
        const {auth: {token}, hostels: {isFetching}} = getState();
        if (isFetching) {
            return Promise.resolve();
        }
        dispatch(fetchHostelsRequest());
        return getBookings(token, 'hostels', type, page)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(json => dispatch(fetchHostelsSuccess(json)))
            .catch(error => dispatch(fetchHostelsFailure(error)));
    };
};
const fetchHostelsRequest = () => ({type: HOSTELS_REQUEST});
const fetchHostelsSuccess = data => ({type: HOSTELS_SUCCESS, data, receivedAt: Date.now()});
const fetchHostelsFailure = error => ({type: HOSTELS_FAILURE, error});
