import {postUsers} from '../../services/authService';
import * as registrationActionTypes from './registrationActionTypes';
import {HOME} from '../../constants';

export const registerIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldRegister(getState())) {
            return dispatch(registration());
        }
        return Promise.resolve();
    };
};
const shouldRegister = ({auth: {isLoggingIn, isLoggedIn}}) => !isLoggingIn && !isLoggedIn;
const registration = () => {
    return (dispatch, getState) => {
        dispatch(registrationRequest());

        const {registration, auth} = getState();
        const {activationUrl, activationFromEmail} = auth;

        return postUsers({registration: registration.registration, activationUrl, activationFromEmail, appName: HOME})
            .then((response) => {
                if (response.status === 201) {
                    dispatch(registrationSuccess('Account created. We have sent you an email with activation instructions.'));

                    return {success: true};
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.error && json.errors) {
                    dispatch(registrationFailure({error: json.error, errors: json.errors}));
                }
            });
    };
};
const registrationRequest = () => ({type: registrationActionTypes.REGISTRATION_REQUEST});
const registrationSuccess = payload => ({type: registrationActionTypes.REGISTRATION_SUCCESS, payload});
const registrationFailure = payload => ({type: registrationActionTypes.REGISTRATION_FAILURE, payload});

export const change = (fieldName, fieldValue) => ({
    type: registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD,
    fieldName,
    fieldValue,
});

export const focus = (fieldName, fieldValue) => ({
    type: registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD,
    fieldName,
    fieldValue,
});

export const setRegistrationErrorMessage = payload => ({type: registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE, payload});
export const setRegistrationSuccessMessage = payload => ({type: registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE, payload});
export const toggleRegistrationPasswordVisibility = () => ({type: registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY});
export const toggleRegistrationRepeatPasswordVisibility = () => ({type: registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY});
