import * as passwordResetActionTypes from '../actions/passwordReset/passwordResetActionTypes';

const initialState = {
    password: '',
    repeatPassword: '',
    isResetting: false,
    isReset: false,
    passwordResetErrorMessage: '',
    passwordResetInputErrors: {
        password: {},
        repeatPassword: {},
    },
    showPassword: false,
    showRepeatPassword: false,
};

const passwordReset = (state = initialState, action) => {
    switch (action.type) {
        case passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE:
            return {...state, [action.payload.name]: action.payload.value};
        case passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE:
            return {...state, passwordResetErrorMessage: action.payload};
        case passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD:
            return {
                ...state,
                passwordResetErrorMessage: '',
                passwordResetInputErrors: {...state.passwordResetInputErrors, [action.payload]: {}},
            };
        case passwordResetActionTypes.SET_IS_RESET_PASSWORD:
            return {...state, isReset: action.payload};
        case passwordResetActionTypes.RESET_PASSWORD_REQUEST:
            return {...state, isResetting: true};
        case passwordResetActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetting: false,
                isReset: true,
                password: '',
                repeatPassword: '',
                passwordResetErrorMessage: '',
            };
        case passwordResetActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetting: false,
                passwordResetErrorMessage: action.payload.passwordResetErrorMessage,
                passwordResetInputErrors: action.payload.passwordResetInputErrors,
            };
        case passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY:
            return {...state, [action.payload]: !state[action.payload]};
        default:
            return state;
    }
};

export default passwordReset;