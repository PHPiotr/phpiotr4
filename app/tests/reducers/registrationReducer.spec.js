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
});
