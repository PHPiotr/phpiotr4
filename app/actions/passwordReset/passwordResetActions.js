import {resetPassword} from '../../services/authService';
import * as passwordResetActionTypes from './passwordResetActionTypes';

export const setResetPasswordInputValue = payload => ({type: passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE, payload});
export const setResetPasswordErrorMessage = payload => ({type: passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE, payload});
export const setIsResetPassword = payload => ({type: passwordResetActionTypes.SET_IS_RESET_PASSWORD, payload});
export const resetPasswordIfNeeded = (userId, token) => {
    return (dispatch, getState) => {
        const {passwordReset} = getState();
        if (passwordReset.isResetting) {
            return Promise.resolve();
        }
        dispatch({type: passwordResetActionTypes.RESET_PASSWORD_REQUEST});
        return resetPassword(userId, token, {
            newPassword: passwordReset.newPassword,
            newPasswordRepeat: passwordReset.newPasswordRepeat,
        })
            .then((response) => {
                if (response.status === 204) {
                    return dispatch({type: passwordResetActionTypes.RESET_PASSWORD_SUCCESS});
                }
                throw {message: response.statusText, code: response.code};
            })
            .catch(error => dispatch({type: passwordResetActionTypes.RESET_PASSWORD_FAILURE, payload: {
                passwordResetErrorMessage: error.message}}));
    };
};