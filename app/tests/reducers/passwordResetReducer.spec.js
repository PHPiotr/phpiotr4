import expect from 'expect';
import freeze from 'deep-freeze';
import passwordReset from '../../reducers/passwordResetReducer';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';

describe('Password Reset', () => {
    it(`should set input value on ${passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE}`, () => {
        const payload = {
            name: 'password',
            value: 'some password value',
        };
        const action = {
            type: passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE,
            payload,
        };
        const before = {
            [payload.name]: '',
        };
        const after = {
            [payload.name]: payload.value,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
});
