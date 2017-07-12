import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/login';
import {VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE} from '../actions/verify';

const initialState = {
    login: {},
    loginErrorMessage: '',
    isLoggedIn: false,
    isLoggingIn: false,
    isVerifying: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {

        case VERIFY_REQUEST:
            return {...state, isVerifying: true};
        case VERIFY_SUCCESS:
            return {...state, isLoggedIn: true, isVerifying: false};
        case VERIFY_FAILURE:
            return {...state, isLoggedIn: false, isVerifying: false};

        case LOGIN_REQUEST:
            return {...state, isLoggingIn: true};
        case LOGIN_SUCCESS:
            return {...state, ...initialState, isLoggedIn: true};
        case LOGIN_FAILURE:
            return {
                ...state,
                loginErrorMessage: action.loginErrorMessage,
                isLoggedIn: false,
                isLoggingIn: false
            };

        case 'SET_LOGGED_IN':
            return {...state, ...initialState, isLoggedIn: true};
        case 'SET_LOGIN_FAILED':
            return {
                ...state,
                loginErrorMessage: action.loginErrorMessage,
                isLoggedIn: false
            }
        case 'SET_LOGGED_OUT':
            return {...state, ...initialState};
        case 'ON_FOCUS_LOGIN_FIELD':
            return {...state, loginErrorMessage: ''};
        case 'ON_CHANGE_LOGIN_FIELD':
            return {...state, login: {...state.login, [action.fieldName]: action.fieldValue}};
        default:
            return state;
    }
};

export default auth;