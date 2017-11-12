import {getBookings} from '../../services/bookingServices';
import * as busesActionTypes from './busesActionTypes';

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
const fetchBusesRequest = () => ({type: busesActionTypes.BUSES_REQUEST});
const fetchBusesSuccess = data => ({type: busesActionTypes.BUSES_SUCCESS, data, receivedAt: Date.now()});
const fetchBusesFailure = error => ({type: busesActionTypes.BUSES_FAILURE, error});
