import {getAuthLogin, postUsers, postActivationLink} from '../../services/authService';
import cookie from 'cookie-monster';
import * as authActionTypes from './authActionTypes';

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

        return postUsers(JSON.stringify(getState().auth.registration))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then(({resp: {hash, user: {email, username, _id}}}) => {
                return postActivationLink(JSON.stringify({hash, email, username, id: _id}))
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText, response.status);
                        }
                        return response.json();
                    })
                    .then(json => dispatch(registrationSuccess(json)));
            })
            .catch(error => dispatch(registrationFailure(error)));
    };
};
const registrationRequest = () => ({
    type: authActionTypes.REGISTRATION_REQUEST,
});
const registrationSuccess = (json) => {
    return {
        type: authActionTypes.REGISTRATION_SUCCESS,
        registrationSuccessMessage: 'Account created. We have sent you an email with activation instructions.',
        hash: json.hash,
    };
};
const registrationFailure = (json) => {
    return {
        type: authActionTypes.REGISTRATION_FAILURE,
        ok: false,
        registrationErrorMessage: json.message,
        registrationErrors: json.errors,
    };
};

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
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText, response.status);
                }
                return response.json();
            })
            .then((json) => {
                if (!json) {
                    throw Error('Something bad happened.');
                }
                if (!json.token) {
                    return dispatch(loginFailure({message: json.msg}));
                }
                return dispatch(loginSuccess(json));
            })
            .catch(error => dispatch(loginFailure(error)));
    };
};
const loginRequest = () => ({type: authActionTypes.LOGIN_REQUEST});
const loginSuccess = ({token, expiresIn}) => ({type: authActionTypes.LOGIN_SUCCESS, payload: {token, expiresIn}});
const loginFailure = ({message, errors}) => ({type: authActionTypes.LOGIN_FAILURE, ok: false,  loginErrorMessage: message, loginErrors: errors});

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
    cookie.removeItem(process.env.TOKEN_KEY);
    return (dispatch) => {
        dispatch({type: authActionTypes.LOGOUT});
        return Promise.resolve(true);
    };
};
export const setToken = payload => ({type: authActionTypes.SET_TOKEN, payload});
export const setIsLoggedIn = payload => ({type: authActionTypes.SET_IS_LOGGED_IN, payload});