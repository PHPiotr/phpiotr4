import {activateUser} from '../../services/authService';
import * as activationActionTypes from './activationActionTypes';

export const activateIfNeeded = (userId, bearerToken) => {
    return (dispatch, getState) => {
        if (shouldActivate(getState())) {
            return dispatch(activation(userId, bearerToken));
        }
        return Promise.resolve();
    };
};
const shouldActivate = ({auth: {isLoggingIn, isLoggedIn, isActivating}}) => !isLoggingIn && !isLoggedIn && !isActivating;
const activation = (userId, bearerToken) => {
    return (dispatch) => {
        dispatch(activationRequest());

        return activateUser(userId, bearerToken)
            .then((response) => {
                if (response.status === 204) {
                    dispatch(activationSuccess('Account activated. You can now log in.'));

                    return {success: true};
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                if (!json.success) {
                    throw Error(json.message || 'Something went wrong');
                }
            })
            .catch(e => dispatch(activationFailure(e.message)));
    };
};
const activationRequest = () => ({type: activationActionTypes.ACTIVATION_REQUEST});
const activationSuccess = payload => ({type: activationActionTypes.ACTIVATION_SUCCESS, payload});
const activationFailure = payload => ({type: activationActionTypes.ACTIVATION_FAILURE, payload});

export const setActivationData = (location) => {
    const {host, hostname, protocol} = location;
    return {type: activationActionTypes.SET_ACTIVATION_DATA, payload: {host, hostname, protocol}};
};

export const setActivationErrorMessage = payload => ({type: activationActionTypes.SET_ACTIVATION_ERROR_MESSAGE, payload});
export const setActivationSuccessMessage = payload => ({type: activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE, payload});
