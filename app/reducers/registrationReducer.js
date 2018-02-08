import * as registrationActionTypes from '../actions/registration/registrationActionTypes';

const initialState = {
    registration: {},
    registrationErrorMessage: '',
    registrationErrors: {},
    isRegistering: false,
    registrationSuccessMessage: '',
    showRegistrationPassword: false,
    showRegistrationRepeatPassword: false,
};

const registration = (state = initialState, action) => {
    switch (action.type) {
        case registrationActionTypes.REGISTRATION_REQUEST:
            return {...state, isRegistering: true};
        case registrationActionTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registrationSuccessMessage: action.payload,
                registration: {},
            };
        case registrationActionTypes.REGISTRATION_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registrationErrorMessage: action.payload.error,
                registrationErrors: action.payload.errors,
            };
        case registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD:
            return {
                ...state,
                registrationErrorMessage: '',
                registrationSuccessMessage: '',
                registrationErrors: {...state.registrationErrors, [action.fieldName]: {}},
            };
        case registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD:
            return {
                ...state,
                registrationErrorMessage: '',
                registrationSuccessMessage: '',
                registration: {...state.registration, [action.fieldName]: action.fieldValue},
            };
        case registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE:
            return {...state, registrationErrorMessage: action.payload};
        case registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE:
            return {...state, registrationSuccessMessage: action.payload};
        case registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY:
            return {...state, showRegistrationPassword: !state.showRegistrationPassword};
        case registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY:
            return {...state, showRegistrationRepeatPassword: !state.showRegistrationRepeatPassword};
        default:
            return state;
    }
};

export default registration;