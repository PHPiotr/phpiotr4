import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    SET_TOKEN,
    SET_IS_LOGGED_IN,
} from '../actions/login';

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
    case LOGIN_REQUEST:
        return {...state, isLoggingIn: true};
    case LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            token: action.payload.token,
            expiresIn: action.payload.expiresIn,
        };
    case LOGIN_FAILURE:
        return {
            ...state,
            loginErrorMessage: action.loginErrorMessage,
            isLoggedIn: false,
            isLoggingIn: false,
        };
    case REGISTRATION_REQUEST:
        return {...state, isRegistering: true};
    case REGISTRATION_SUCCESS:
        return {
            ...state,
            isRegistering: false,
            registrationSuccessMessage: action.registrationSuccessMessage,
            registration: {},
        };
    case REGISTRATION_FAILURE:
        return {
            ...state,
            isRegistering: false,
            registrationErrorMessage: action.registrationErrorMessage,
        };
    case SET_IS_LOGGED_IN:
        return {...state, isLoggedIn: action.payload};
    case SET_TOKEN:
        return {...state, token: action.payload};
    case 'SET_LOGIN_FAILED':
        return {
            ...state,
            loginErrorMessage: action.loginErrorMessage,
            isLoggedIn: false,
        };
    case 'SET_LOGGED_OUT':
        return {...state, ...initialState};
    case 'ON_FOCUS_LOGIN_FIELD':
        return {...state, loginErrorMessage: ''};
    case 'ON_CHANGE_LOGIN_FIELD':
        return {...state, login: {...state.login, [action.fieldName]: action.fieldValue}};
    case 'ON_FOCUS_REGISTRATION_FIELD':
        return {...state, registrationErrorMessage: '', registrationSuccessMessage: ''};
    case 'ON_CHANGE_REGISTRATION_FIELD':
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