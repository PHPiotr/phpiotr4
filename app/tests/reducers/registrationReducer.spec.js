import expect from 'expect';
import freeze from 'deep-freeze';
import registration from '../../reducers/registrationReducer';
import * as registrationActionTypes from '../../actions/registration/registrationActionTypes';

describe('Registration', () => {
    it(`should start request on ${registrationActionTypes.REGISTRATION_REQUEST}`, () => {
        const action = {type: registrationActionTypes.REGISTRATION_REQUEST};
        const before = {isRegistering: false};
        const after = {isRegistering: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should succeed request on ${registrationActionTypes.REGISTRATION_SUCCESS}`, () => {
        const payload = 'Success';
        const action = {type: registrationActionTypes.REGISTRATION_SUCCESS, payload};
        const before = {isRegistering: true, registrationSuccessMessage: '', registration: {hello: 'world'}};
        const after = {isRegistering: false, registrationSuccessMessage: payload, registration: {}};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should succeed request on ${registrationActionTypes.REGISTRATION_FAILURE}`, () => {
        const payload = {
            error: 'Some error',
            errors: {
                whatever: true,
            },
        };
        const action = {type: registrationActionTypes.REGISTRATION_FAILURE, payload};
        const before = {isRegistering: true, registrationErrorMessage: '', registrationErrors: {}};
        const after = {isRegistering: false, registrationErrorMessage: payload.error, registrationErrors: payload.errors};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should remove errors on ${registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD}`, () => {
        const fieldName = 'password';
        const action = {type: registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD, fieldName};
        const before = {
            registrationErrorMessage: 'Some error',
            registrationErrors: {
                [fieldName]: {
                    message: 'Some error',
                },
            },
        };
        const after = {
            registrationErrorMessage: '',
            registrationSuccessMessage: '',
            registrationErrors: {
                [fieldName]: {},
            },
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should set field value on ${registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD}`, () => {
        const fieldName = 'password';
        const fieldValue = 'whatever';
        const action = {type: registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD, fieldName, fieldValue};
        const before = {
            registration: {},
        };
        const after = {
            registration: {
                [fieldName]: fieldValue,
            },
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should set registration error message on ${registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE}`, () => {
        const payload = 'Error';
        const action = {type: registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE, payload};
        const before = {
            registrationErrorMessage: '',
        };
        const after = {
            registrationErrorMessage: payload,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should set registration success message on ${registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE}`, () => {
        const payload = 'Success';
        const action = {type: registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE, payload};
        const before = {
            registrationSuccessMessage: '',
        };
        const after = {
            registrationSuccessMessage: payload,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
    it(`should toggle password visibility on/off on ${registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY}`, () => {
        const action = {type: registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY};
        const before = {
            showRegistrationPassword: false,
        };
        const after = {
            showRegistrationPassword: !before.showRegistrationPassword,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
});
