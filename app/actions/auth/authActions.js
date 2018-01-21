import {getAuthLogin} from '../../services/authService';
import {Cookies} from 'react-cookie';
import * as authActionTypes from './authActionTypes';

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
                ? dispatch(loginFailure({message: json.error, errors: json.errors}))
                : dispatch(loginSuccess(json)))
            .catch(error => dispatch(loginFailure({message: error.message, errors: {}})));
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
