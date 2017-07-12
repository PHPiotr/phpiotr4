import fetch from 'isomorphic-fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const shouldLogin = (state) => {
    if (state.auth.isLoggingIn) {
        return false;
    }
    if (state.auth.isLoggedIn) {
        return false;
    }
    return true;
};

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginSuccess = (json) => {
    return {
        type: LOGIN_SUCCESS,
        token: json.token,
        expiresIn: parseInt(json.expiresIn)
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

const login = (event, data, headers) => {
    return (dispatch) => {
        headers['Authorization'] = 'Basic ' + btoa(data.username + ':' + data.password);
        dispatch(loginRequest());
        return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/login`, {
            method: 'get',
            headers: headers,
        })
            .then(response => response.json())
            .then(json => {
                if (json) {
                    if (json.token) {
                        return dispatch(loginSuccess(json));
                    }
                    return dispatch(loginFailure({message: 'Please provide valid credentials'}));
                }
                throw Error('Something bad happened.');
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    };
};

export const loginIfNeeded = (event, data, headers) => {
    return (dispatch, getState) => {
        if (shouldLogin(getState())) {
            return dispatch(login(event, data, headers))
        }
        return Promise.resolve();
    }
};

export const change = (fieldName, fieldValue) => ({
    type: 'ON_CHANGE_LOGIN_FIELD',
    fieldName,
    fieldValue,
});

export const focus = (fieldName) => ({
    type: 'ON_FOCUS_LOGIN_FIELD',
    fieldName,
});

export const logout = () => ({
    type: 'SET_LOGGED_OUT'
});