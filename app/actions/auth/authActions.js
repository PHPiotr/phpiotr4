import {getAuthLogin, postUsers, activateUser, recoverAccount, resetPassword} from '../../services/authService';
import {Cookies} from 'react-cookie';
import * as authActionTypes from './authActionTypes';
import {HOME} from '../../constants';

export const registerIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldRegister(getState())) {
            return dispatch(registration());
        }
        return Promise.resolve();
    };
};
const shouldRegister = ({auth: {isLoggingIn, isLoggedIn}}) => !isLoggingIn && !isLoggedIn;
const registration = () => {
    return (dispatch, getState) => {
        dispatch(registrationRequest());

        const {auth, app} = getState();
        const {registration, activationUrl, activationFromEmail} = auth;
        const {appBarTitle} = app;

        return postUsers({registration, activationUrl, activationFromEmail, appName: appBarTitle})
            .then((response) => {
                if (response.status === 201) {
                    dispatch(registrationSuccess('Account created. We have sent you an email with activation instructions.'));

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
            .catch(e => dispatch(registrationFailure(e.message)));
    };
};
const registrationRequest = () => ({type: authActionTypes.REGISTRATION_REQUEST});
const registrationSuccess = payload => ({type: authActionTypes.REGISTRATION_SUCCESS, payload});
const registrationFailure = payload => ({type: authActionTypes.REGISTRATION_FAILURE, payload});

export const loginIfNeeded = () => {
    return (dispatch, getState) => {
        const {auth: {isLoggingIn, isLoggedIn, login}} = getState();
        if (!isLoggingIn && !isLoggedIn) {
            return dispatch(logUserIn(login));
        }
        return Promise.resolve();
    };
};
const logUserIn = ({username, password}) => {
    return (dispatch) => {
        dispatch(loginRequest());
        return getAuthLogin(username, password)
            .then(response => response.json())
            .then(json => json.success === false
                ? dispatch(loginFailure({message: json.msg}))
                : dispatch(loginSuccess(json)))
            .catch(error => dispatch(loginFailure(error)));
    };
};
const loginRequest = () => ({type: authActionTypes.LOGIN_REQUEST});
const loginSuccess = ({token, expiresIn}) => ({type: authActionTypes.LOGIN_SUCCESS, payload: {token, expiresIn}});
const loginFailure = ({message, errors}) => ({type: authActionTypes.LOGIN_FAILURE, loginErrorMessage: message, loginErrors: errors});

export const change = (fieldName, fieldValue, type = authActionTypes.ON_CHANGE_LOGIN_FIELD) => ({
    type,
    fieldName,
    fieldValue,
});

export const focus = (fieldName, fieldValue, type = authActionTypes.ON_FOCUS_LOGIN_FIELD) => ({
    type,
    fieldName,
    fieldValue,
});

export const logoutIfNeeded = () => {
    const cookies = new Cookies();
    cookies.remove(process.env.TOKEN_KEY, {path: '/'});
    return (dispatch) => {
        dispatch({type: authActionTypes.LOGOUT});
        return Promise.resolve(true);
    };
};
export const setToken = payload => ({type: authActionTypes.SET_TOKEN, payload});
export const setIsLoggedIn = payload => ({type: authActionTypes.SET_IS_LOGGED_IN, payload});

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
const activationRequest = () => ({type: authActionTypes.ACTIVATION_REQUEST});
const activationSuccess = payload => ({type: authActionTypes.ACTIVATION_SUCCESS, payload});
const activationFailure = payload => ({type: authActionTypes.ACTIVATION_FAILURE, payload});

export const setActivationData = () => {
    const {host, hostname, protocol} = location;
    return {type: authActionTypes.SET_ACTIVATION_DATA, payload: {host, hostname, protocol}};
};

// Account recovery
// TODO: Move to separate action creator
export const setRecoveryEmail = payload => ({type: authActionTypes.SET_RECOVERY_EMAIL, payload});
export const setIsRecovered = payload => ({type: authActionTypes.SET_IS_RECOVERED, payload});
export const setRecoveryErrorMessage = payload => ({type: authActionTypes.SET_RECOVERY_ERROR_MESSAGE, payload});
export const recoverAccountIfNeeded = () => {
    return (dispatch, getState) => {
        const {auth} = getState();
        if (auth.isRecovering) {
            return Promise.resolve();
        }
        dispatch({type: authActionTypes.ACCOUNT_RECOVERY_REQUEST});
        const {host, hostname, protocol} = location;
        return recoverAccount({
            email: auth.recoveryEmail,
            appName: HOME,
            recoveryUrl: `${protocol}//${host}/password-reset`,
            recoveryFromEmail: `no-reply@${hostname}`,
        })
            .then((response) => {
                if (response.status === 201) {
                    return dispatch({type: authActionTypes.ACCOUNT_RECOVERY_SUCCESS});
                }
                throw {message: response.statusText, code: response.code};
            })
            .catch(error => dispatch({type: authActionTypes.ACCOUNT_RECOVERY_FAILURE, payload: {recoveryErrorMessage: error.message}}));
    };
};

// Reset password
// TODO: Move to separate action creator
export const setResetPasswordInputValue = payload => ({type: authActionTypes.SET_RESET_PASSWORD_INPUT_VALUE, payload});
export const setResetPasswordErrorMessage = payload => ({type: authActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE, payload});
export const setIsResetPassword = payload => ({type: authActionTypes.SET_IS_RESET_PASSWORD, payload});
export const resetPasswordIfNeeded = (userId, token) => {
    return (dispatch, getState) => {
        const {auth} = getState();
        if (auth.isResetting) {
            return Promise.resolve();
        }
        dispatch({type: authActionTypes.RESET_PASSWORD_REQUEST});
        return resetPassword(userId, token, {
            newPassword: auth.newPassword,
            newPasswordRepeat: auth.newPasswordRepeat,
        })
            .then((response) => {
                if (response.status === 204) {
                    return dispatch({type: authActionTypes.RESET_PASSWORD_SUCCESS});
                }
                throw {message: response.statusText, code: response.code};
            })
            .catch(error => dispatch({type: authActionTypes.RESET_PASSWORD_FAILURE, payload: {
                passwordResetErrorMessage: error.message}}));
    };
};
