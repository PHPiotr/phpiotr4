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
        ok: true,
        token: json.token,
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
        dispatch(loginRequest());
        return fetch(`${process.env.API_URL}/api/v1/auth/login`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    return dispatch(loginSuccess(json));
                }
                if (json.errors) {
                    return dispatch(loginFailure(json));
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