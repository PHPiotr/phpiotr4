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
            newPassword: passwordReset.password,
            newPasswordRepeat: passwordReset.repeatPassword,
        })
            .then((response) => {
                if (response.status === 204) {
                    dispatch({type: passwordResetActionTypes.RESET_PASSWORD_SUCCESS});
                    return {success: true};
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.err) {
                    dispatch({type: passwordResetActionTypes.RESET_PASSWORD_FAILURE, payload: {
                        passwordResetErrorMessage: json.err.message,
                        passwordResetInputErrors: json.err.errors,
                    }});
                }
            });
    };
};

export const togglePasswordVisibility = payload => ({type: passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY, payload});
export const onFocusPasswordResetField = payload => ({type: passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD, payload});
