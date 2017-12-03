import * as authActionTypes from '../actions/auth/authActionTypes';

const initialState = {
    login: {},
    loginErrorMessage: '',
    isLoggedIn: false,
    isLoggingIn: false,
    registration: {},
    registrationErrorMessage: '',
    isRegistering: false,
    isVerifying: false,
    registrationSuccessMessage: '',
    token: '',
    expiresIn: 0,
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
                loginErrorMessage: action.loginErrorMessage,
                isLoggedIn: false,
                isLoggingIn: false,
            };
        case authActionTypes.REGISTRATION_REQUEST:
            return {...state, isRegistering: true};
        case authActionTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registrationSuccessMessage: action.registrationSuccessMessage,
                registration: {},
            };
        case authActionTypes.REGISTRATION_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registrationErrorMessage: action.registrationErrorMessage,
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
            return {...state, loginErrorMessage: ''};
        case authActionTypes.ON_CHANGE_LOGIN_FIELD:
            return {...state, login: {...state.login, [action.fieldName]: action.fieldValue}};
        case authActionTypes.ON_FOCUS_REGISTRATION_FIELD:
            return {...state, registrationErrorMessage: '', registrationSuccessMessage: ''};
        case authActionTypes.ON_CHANGE_REGISTRATION_FIELD:
            return {
                ...state,
                registrationErrorMessage: '',
                registrationSuccessMessage: '',
                registration: {...state.registration, [action.fieldName]: action.fieldValue},
            };
        default:
            return state;
    }
};

export default auth;