import expect from 'expect';
import * as recoveryActions from '../../actions/recovery/recoveryActions';
import * as recoveryActionTypes from '../../actions/recovery/recoveryActionTypes';

describe('Recovery Actions', () => {
    it(`should create ${recoveryActionTypes.SET_RECOVERY_EMAIL} when recovery email is set`, () => {
        const payload = 'user@example.com';
        const expectedAction = {
            type: recoveryActionTypes.SET_RECOVERY_EMAIL,
            payload,
        };
        expect(recoveryActions.setRecoveryEmail(payload)).toEqual(expectedAction);
    });
});
