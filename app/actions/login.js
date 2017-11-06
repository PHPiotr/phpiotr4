import fetch from 'isomorphic-fetch';
import getHeaders from '../getHeaders';

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

const shouldRegister = (state) => {
    if (state.auth.isLoggingIn) {
        return false;
    }
    if (state.auth.isLoggedIn) {
        return false;
    }
    return true;
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

const registration = () => {
    let resp;
    let headers = getHeaders();
    return (dispatch, getState) => {
        dispatch(registrationRequest());

        return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users`, {
            method: 'post',
            body: JSON.stringify(getState().auth.registration),
            headers: headers,
        })
            .then(response => response.json())
            .then((json) => {
                if (!json) {
                    throw Error('Something bad happened.');
                }
                if (json.err) {
                    return dispatch(registrationFailure(json.err));
                }
                resp = json;

                return fetch('send_activation_link', {
                    method: 'post',
                    body: JSON.stringify({
                        hash: resp.hash,
                        email: resp.user.email,
                        username: resp.user.username,
                        id: resp.user._id,
                    }),
                    headers: headers,
                })
                    .then(response => response.json())
                    .then((response) => {
                        if (!response) {
                            throw Error('Something bad happened.');
                        }
                        console.log('response', response);
                        if (response.err) {
                            return dispatch(registrationFailure(response.err));
                        }
                        dispatch(registrationSuccess(resp));
                    })
                    .catch((error) => {
                        dispatch(registrationFailure(error));
                    });
            })
            .catch((error) => {
                dispatch(registrationFailure(error));
            });
    };
};

export const registerIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldRegister(getState())) {
            return dispatch(registration());
        }
        return Promise.resolve();
    };
};

const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

const loginSuccess = (json) => {
    return {
        type: LOGIN_SUCCESS,
        token: json.token,
        expiresIn: parseInt(json.expiresIn),
    };
};

const loginFailure = (json) => {
    return {
        type: LOGIN_FAILURE,
        ok: false,
        loginErrorMessage: json.message,
        loginErrors: json.errors,
    };
};

export const loginIfNeeded = (event, headers) => {
    return (dispatch, getState) => {
        const {auth} = getState();
        const {isLoggingIn, isLoggedIn} = auth;
        if (!isLoggingIn && !isLoggedIn) {
            return dispatch(login(event, auth.login, headers));
        }
        return Promise.resolve();
    };
};

const login = (event, {username, password}, headers) => {
    return (dispatch) => {
        headers['Authorization'] = 'Basic ' + btoa(username + ':' + password);
        dispatch(loginRequest());
        return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/login`, {
            method: 'get',
            headers: headers,
        })
            .then(response => response.json())
            .then((json) => {
                if (json) {
                    if (json.token) {
                        return dispatch(loginSuccess(json));
                    }
                    return dispatch(loginFailure({message: json.msg}));
                }
                throw Error('Something bad happened.');
            })
            .catch((error) => {
                dispatch(loginFailure(error));
            });
    };
};

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

export const logout = () => ({
    type: 'SET_LOGGED_OUT',
});