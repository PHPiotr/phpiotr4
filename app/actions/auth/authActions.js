import {getAuthLogin} from '../../services/authService';
import {Cookies} from 'react-cookie';
import * as authActionTypes from './authActionTypes';

export const loginIfNeeded = (basic) => {
    return (dispatch, getState) => {
        const {auth: {isLoggingIn, isLoggedIn}} = getState();
        if (!isLoggingIn && !isLoggedIn) {
            return dispatch(logUserIn(basic));
        }
        return Promise.resolve();
    };
};
const logUserIn = (basic) => {
    return (dispatch) => {
        dispatch(loginRequest());
        return getAuthLogin(basic)
            .then(response => response.json())
            .then(json => (json.token && json.expiresIn)
                ? dispatch(loginSuccess(json))
                : dispatch(loginFailure({message: json.error, errors: json.errors})));
    };
};
const loginRequest = () => ({type: authActionTypes.LOGIN_REQUEST});
const loginSuccess = ({token, expiresIn}) => ({type: authActionTypes.LOGIN_SUCCESS, payload: {token, expiresIn}});
const loginFailure = payload => ({type: authActionTypes.LOGIN_FAILURE, payload});

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

export const setLoginErrorMessage = payload => ({type: authActionTypes.SET_LOGIN_ERROR_MESSAGE, payload});
export const toggleLoginPasswordVisibility = () => ({type: authActionTypes.TOGGLE_LOGIN_PASSWORD_VISIBILITY});
