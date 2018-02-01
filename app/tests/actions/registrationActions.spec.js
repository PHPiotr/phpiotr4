import expect from 'expect';
import * as registrationActions from '../../actions/registration/registrationActions';
import * as registrationActionTypes from '../../actions/registration/registrationActionTypes';

describe('Registration Actions', () => {
    it(`should create ${registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE} when error message set`, () => {
        const payload = 'An error occurred';
        const expectedAction = {
            type: registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE,
            payload,
        };
        expect(registrationActions.setRegistrationErrorMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE} when success message set`, () => {
        const payload = 'Success message';
        const expectedAction = {
            type: registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE,
            payload,
        };
        expect(registrationActions.setRegistrationSuccessMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY} when visibility of password toggled`, () => {
        const expectedAction = {
            type: registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY,
        };
        expect(registrationActions.toggleRegistrationPasswordVisibility()).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY} when visibility of repeat-password toggled`, () => {
        const expectedAction = {
            type: registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY,
        };
        expect(registrationActions.toggleRegistrationRepeatPasswordVisibility()).toEqual(expectedAction);
    });
});