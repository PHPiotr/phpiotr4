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
    activationUrl: '',
    activationFromEmail: '',
    registration: {},
    registrationErrorMessage: '',
    registrationErrors: {},
    isRegistering: false,
    registrationSuccessMessage: '',
    isActivating: false,
    activationErrorMessage: '',
    activationSuccessMessage: '',
    isVerifying: false,
    token: '',
    expiresIn: 0,
    showLoginPassword: false,
    showRegistrationPassword: false,
    showRegistrationRepeatPassword: false,
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
                loginErrors: action.payload.errors || {},
            };
        case authActionTypes.REGISTRATION_REQUEST:
            return {...state, isRegistering: true};
        case authActionTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registrationSuccessMessage: action.payload,
                registration: {},
            };
        case authActionTypes.REGISTRATION_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registrationErrorMessage: action.payload.error || '',
                registrationErrors: action.payload.errors || {},
            };
        case authActionTypes.ACTIVATION_REQUEST:
            return {...state, isActivating: true};
        case authActionTypes.ACTIVATION_SUCCESS:
            return {
                ...state,
                isActivating: false,
                activationSuccessMessage: action.payload,
            };
        case authActionTypes.ACTIVATION_FAILURE:
            return {
                ...state,
                isActivating: false,
                activationErrorMessage: action.payload,
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
        case authActionTypes.ON_FOCUS_REGISTRATION_FIELD:
            return {
                ...state,
                registrationErrorMessage: '',
                registrationSuccessMessage: '',
                registrationErrors: {...state.registrationErrors, [action.fieldName]: {}},
            };
        case authActionTypes.ON_CHANGE_REGISTRATION_FIELD:
            return {
                ...state,
                registrationErrorMessage: '',
                registrationSuccessMessage: '',
                registration: {...state.registration, [action.fieldName]: action.fieldValue},
            };
        case authActionTypes.SET_REGISTRATION_ERROR_MESSAGE:
            return {...state, registrationErrorMessage: action.payload};
        case authActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE:
            return {...state, registrationSuccessMessage: action.payload};
        case authActionTypes.SET_ACTIVATION_DATA:
            return {
                ...state,
                activationUrl: `${action.payload.protocol}//${action.payload.host}/register`,
                activationFromEmail: `no-reply@${action.payload.hostname}`,
            };
        case authActionTypes.TOGGLE_LOGIN_PASSWORD_VISIBILITY:
            return {...state, showLoginPassword: !state.showLoginPassword};
        case authActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY:
            return {...state, showRegistrationPassword: !state.showRegistrationPassword};
        case authActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY:
            return {...state, showRegistrationRepeatPassword: !state.showRegistrationRepeatPassword};
        case authActionTypes.SET_LOGIN_ERROR_MESSAGE:
            return {...state, loginErrorMessage: action.payload};
        default:
            return state;
    }
};

export default auth;