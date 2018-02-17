import {changePassword} from '../../services/authService';
import * as passwordChangeActionTypes from './passwordChangeActionTypes';

export const setChangePasswordInputValue = payload => ({type: passwordChangeActionTypes.SET_CHANGE_PASSWORD_INPUT_VALUE, payload});
export const setChangePasswordErrorMessage = payload => ({type: passwordChangeActionTypes.SET_CHANGE_PASSWORD_ERROR_MESSAGE, payload});
export const setIsChangePassword = payload => ({type: passwordChangeActionTypes.SET_IS_CHANGE_PASSWORD, payload});
export const changePasswordIfNeeded = (userId) => {
    return (dispatch, getState) => {
        const {passwordChange, auth: {token}} = getState();
        if (passwordChange.isChangingPassword) {
            return Promise.resolve();
        }
        dispatch({type: passwordChangeActionTypes.CHANGE_PASSWORD_REQUEST});
        return changePassword(userId, token, {
            currentPassword: passwordChange.currentPassword,
            newPassword: passwordChange.newPassword,
            newPasswordRepeat: passwordChange.repeatNewPassword,
        })
            .then((response) => {
                if (response.status === 204) {
                    dispatch({type: passwordChangeActionTypes.CHANGE_PASSWORD_SUCCESS});
                    return {success: true};
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.err) {
                    dispatch({type: passwordChangeActionTypes.CHANGE_PASSWORD_FAILURE, payload: {
                        passwordChangeErrorMessage: json.message,
                        passwordChangeInputErrors: json.err.errors,
                    }});
                }
            });
    };
};

export const togglePasswordChangeVisibility = payload => ({type: passwordChangeActionTypes.TOGGLE_PASSWORD_CHANGE_VISIBILITY, payload});
export const onFocusPasswordChangeField = payload => ({type: passwordChangeActionTypes.ON_FOCUS_PASSWORD_CHANGE_FIELD, payload});
