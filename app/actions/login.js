import {getAuthLogin, postUsers, postActivationLink} from '../services/authService';
import cookie from 'cookie-monster';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const ON_CHANGE_LOGIN_FIELD = 'ON_CHANGE_LOGIN_FIELD';
export const ON_FOCUS_LOGIN_FIELD = 'ON_FOCUS_LOGIN_FIELD';
export const ON_CHANGE_REGISTRATION_FIELD = 'ON_CHANGE_REGISTRATION_FIELD';
export const ON_FOCUS_REGISTRATION_FIELD = 'ON_FOCUS_REGISTRATION_FIELD';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const LOGOUT = 'LOGOUT';

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
    type: REGISTRATION_REQUEST,
});
const registrationSuccess = (json) => {
    return {
        type: REGISTRATION_SUCCESS,
        registrationSuccessMessage: 'Account created. We have sent you an email with activation instructions.',
        hash: json.hash,
    };
};
const registrationFailure = (json) => {
    return {
        type: REGISTRATION_FAILURE,
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
const loginRequest = () => ({type: LOGIN_REQUEST});
const loginSuccess = ({token, expiresIn}) => ({type: LOGIN_SUCCESS, payload: {token, expiresIn}});
const loginFailure = ({message, errors}) => ({type: LOGIN_FAILURE, ok: false,  loginErrorMessage: message, loginErrors: errors});

export const change = (fieldName, fieldValue, type = ON_CHANGE_LOGIN_FIELD) => ({
    type,
    fieldName,
    fieldValue,
});

export const focus = (fieldName, fieldValue, type = ON_FOCUS_LOGIN_FIELD) => ({
    type,
    fieldName,
    fieldValue,
});

export const logoutIfNeeded = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT});
        cookie.removeItem(process.env.TOKEN_KEY);
        return Promise.resolve(true);
    };
};
export const setToken = payload => ({type: SET_TOKEN, payload});
export const setIsLoggedIn = payload => ({type: SET_IS_LOGGED_IN, payload});