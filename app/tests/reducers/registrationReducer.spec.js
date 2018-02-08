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
        const before = {isRegistering: true, registrationSuccessMessage: payload, registration: {hello: 'world'}};
        const after = {isRegistering: false, registrationSuccessMessage: payload, registration: {}};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(registration(before, action)).toEqual(after);
    });
});
