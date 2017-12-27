import * as recoveryActionTypes from './recoveryActionTypes';
import {recoverAccount} from '../../services/authService';
import {HOME} from '../../constants';

export const setRecoveryEmail = payload => ({type: recoveryActionTypes.SET_RECOVERY_EMAIL, payload});
export const setIsRecovered = payload => ({type: recoveryActionTypes.SET_IS_RECOVERED, payload});
export const setRecoveryErrorMessage = payload => ({type: recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE, payload});
export const recoverAccountIfNeeded = () => {
    return (dispatch, getState) => {
        const {recovery} = getState();
        if (recovery.isRecovering) {
            return Promise.resolve();
        }
        dispatch({type: recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST});
        const {host, hostname, protocol} = location;
        return recoverAccount({
            email: recovery.recoveryEmail,
            appName: HOME,
            recoveryUrl: `${protocol}//${host}/password-reset`,
            recoveryFromEmail: `no-reply@${hostname}`,
        })
            .then((response) => {
                if (response.status === 201) {
                    return dispatch({type: recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS});
                }
                throw {message: response.statusText, code: response.code};
            })
            .catch(error => dispatch({type: recoveryActionTypes.ACCOUNT_RECOVERY_FAILURE, payload: {recoveryErrorMessage: error.message}}));
    };
};