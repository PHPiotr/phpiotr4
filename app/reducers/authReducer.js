import * as authActionTypes from '../actions/auth/authActionTypes';

const initialState = {
    login: {
        username: '',
        password: '',
    },
    loginErrorMessage: '',
    loginErrors: {},
    isLoggedIn: false,
    isLoggingIn: false,
    isVerifying: false,
    token: '',
    expiresIn: 0,
    showLoginPassword: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.LOGIN_REQUEST:
            return {...state, isLoggingIn: true};
        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                expiresIn: action.payload.expiresIn,
                login: {},
                isLoggingIn: false,
            };
        case authActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                loginErrorMessage: action.payload.message,
                isLoggedIn: false,
                isLoggingIn: false,
                loginErrors: action.payload.errors,
            };
        case authActionTypes.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload};
        case authActionTypes.SET_TOKEN:
            return {...state, token: action.payload};
        case authActionTypes.SET_LOGIN_FAILED:
            return {
                ...state,
                loginErrorMessage: action.loginErrorMessage,
                isLoggedIn: false,
            };
        case authActionTypes.LOGOUT:
            return {...state, ...initialState};
        case authActionTypes.ON_FOCUS_LOGIN_FIELD:
            return {
                ...state,
                loginErrorMessage: '',
                loginErrors: {...state.loginErrors, [action.fieldName]: {}},
            };
        case authActionTypes.ON_CHANGE_LOGIN_FIELD:
            return {...state, login: {...state.login, [action.fieldName]: action.fieldValue}};
        case authActionTypes.TOGGLE_LOGIN_PASSWORD_VISIBILITY:
            return {...state, showLoginPassword: !state.showLoginPassword};
        case authActionTypes.SET_LOGIN_ERROR_MESSAGE:
            return {...state, loginErrorMessage: action.payload};
        default:
            return state;
    }
};

export default auth;