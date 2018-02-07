import expect from 'expect';
import freeze from 'deep-freeze';
import recovery from '../../reducers/recoveryReducer';
import * as recoveryActionTypes from '../../actions/recovery/recoveryActionTypes';

describe('Recovery', () => {
    it(`should set email on ${recoveryActionTypes.SET_RECOVERY_EMAIL}`, () => {
        const payload = 'someone@example.com';
        const action = {type: recoveryActionTypes.SET_RECOVERY_EMAIL, payload};
        const before = {recoveryEmail: 'whatever'};
        const after = {recoveryEmail: payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
});
