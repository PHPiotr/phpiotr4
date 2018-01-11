import * as authActionTypes from '../actions/auth/authActionTypes';

const initialState = {
    login: {},
    loginErrorMessage: '',
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
    newPassword: '',
    newPasswordRepeat: '',
    isResetting: false,
    isReset: false,
    passwordResetErrorMessage: '',
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
        case authActionTypes.SET_ACTIVATION_DATA:
            return {
                ...state,
                activationUrl: `${action.payload.protocol}//${action.payload.host}/register`,
                activationFromEmail: `no-reply@${action.payload.hostname}`,
            };

        // Password reset
        // TODO: Move to separate reducer
        case authActionTypes.SET_RESET_PASSWORD_INPUT_VALUE:
            return {...state, [action.payload.name]: action.payload.value};
        case authActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE:
            return {...state, passwordResetErrorMessage: action.payload};
        case authActionTypes.SET_IS_RESET_PASSWORD:
            return {...state, isReset: action.payload};
        case authActionTypes.RESET_PASSWORD_REQUEST:
            return {...state, isResetting: true};
        case authActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetting: false,
                isReset: true,
                newPassword: '',
                newPasswordRepeat: '',
                passwordResetErrorMessage: '',
            };
        case authActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetting: false,
                passwordResetErrorMessage: action.payload.passwordResetErrorMessage,
            };
        default:
            return state;
    }
};

export default auth;