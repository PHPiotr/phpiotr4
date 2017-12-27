import * as passwordResetActionTypes from '../actions/passwordReset/passwordResetActionTypes';

const initialState = {
    newPassword: '',
    newPasswordRepeat: '',
    isResetting: false,
    isReset: false,
    passwordResetErrorMessage: '',
};

const passwordReset = (state = initialState, action) => {
    switch (action.type) {
        case passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE:
            return {...state, [action.payload.name]: action.payload.value};
        case passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE:
            return {...state, passwordResetErrorMessage: action.payload};
        case passwordResetActionTypes.SET_IS_RESET_PASSWORD:
            return {...state, isReset: action.payload};
        case passwordResetActionTypes.RESET_PASSWORD_REQUEST:
            return {...state, isResetting: true};
        case passwordResetActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetting: false,
                isReset: true,
                newPassword: '',
                newPasswordRepeat: '',
                passwordResetErrorMessage: '',
            };
        case passwordResetActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetting: false,
                passwordResetErrorMessage: action.payload.passwordResetErrorMessage,
            };
        default:
            return state;
    }
};

export default passwordReset;