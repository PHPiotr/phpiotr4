import * as passwordChangeActionTypes from '../actions/passwordChange/passwordChangeActionTypes';

const initialState = {
    currentPassword: '',
    password: '',
    repeatPassword: '',
    isChangingPassword: false,
    isChangedPassword: false,
    passwordChangeErrorMessage: '',
    passwordChangeInputErrors: {
        currentPassword: {},
        password: {},
        repeatPassword: {},
    },
    showCurrentPassword: false,
    showPassword: false,
    showRepeatPassword: false,
};

const passwordChange = (state = initialState, action) => {
    switch (action.type) {
        case passwordChangeActionTypes.SET_CHANGE_PASSWORD_INPUT_VALUE:
            return {...state, [action.payload.name]: action.payload.value};
        case passwordChangeActionTypes.SET_CHANGE_PASSWORD_ERROR_MESSAGE:
            return {...state, passwordChangeErrorMessage: action.payload};
        case passwordChangeActionTypes.ON_FOCUS_PASSWORD_CHANGE_FIELD:
            return {
                ...state,
                passwordChangeErrorMessage: '',
                passwordChangeInputErrors: {...state.passwordChangeInputErrors, [action.payload]: {}},
            };
        case passwordChangeActionTypes.SET_IS_CHANGE_PASSWORD:
            return {...state, isChange: action.payload};
        case passwordChangeActionTypes.CHANGE_PASSWORD_REQUEST:
            return {...state, isChangingPassword: true};
        case passwordChangeActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isChangingPassword: false,
                isChangedPassword: true,
                currentPassword: '',
                password: '',
                repeatPassword: '',
                passwordChangeErrorMessage: '',
            };
        case passwordChangeActionTypes.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isChangingPassword: false,
                passwordChangeErrorMessage: action.payload.passwordChangeErrorMessage,
                passwordChangeInputErrors: action.payload.passwordChangeInputErrors,
            };
        case passwordChangeActionTypes.TOGGLE_PASSWORD_CHANGE_VISIBILITY:
            return {...state, [action.payload]: !state[action.payload]};
        default:
            return state;
    }
};

export default passwordChange;