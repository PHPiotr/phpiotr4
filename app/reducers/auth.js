const initialState = {
    login: {},
    loginErrorMessage: '',
    loginErrors: {},
    isLoggedIn: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {...state, ...initialState, isLoggedIn: true};
        case 'SET_LOGIN_FAILED':
            return {
                ...state,
                loginErrorMessage: action.loginErrorMessage,
                loginErrors: action.loginErrors,
                isLoggedIn: false
            }
        case 'SET_LOGGED_OUT':
            return {...state, ...initialState};
        case 'ON_FOCUS_LOGIN_FIELD':
            return {...state, loginErrorMessage: '', loginErrors: {...state.loginErrors, [action.fieldName]: ''}};
        case 'ON_CHANGE_LOGIN_FIELD':
            return {...state, login: {...state.login, [action.fieldName]: action.fieldValue}};
        default:
            return state;
    }
};

export default auth;