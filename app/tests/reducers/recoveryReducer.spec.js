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
    it(`should set isRecovered flag on ${recoveryActionTypes.SET_IS_RECOVERED}`, () => {
        const payload = true;
        const action = {type: recoveryActionTypes.SET_IS_RECOVERED, payload};
        const before = {isRecovered: false};
        const after = {isRecovered: payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
    it(`should set error message on ${recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE}`, () => {
        const payload = 'Some error';
        const action = {type: recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE, payload};
        const before = {recoveryErrorMessage: ''};
        const after = {recoveryErrorMessage: payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
    it(`should begin request on ${recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST}`, () => {
        const action = {type: recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST};
        const before = {isRecovering: false};
        const after = {isRecovering: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
    it(`should succeed request on ${recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS}`, () => {
        const action = {type: recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS};
        const before = {isRecovering: true, recoveryEmail: 'someone@example.com', isRecovered: false};
        const after = {isRecovering: false, recoveryEmail: '', isRecovered: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
    it(`should succeed request on ${recoveryActionTypes.ACCOUNT_RECOVERY_FAILURE}`, () => {
        const payload = {
            recoveryErrorMessage: 'Some error',
        };
        const action = {type: recoveryActionTypes.ACCOUNT_RECOVERY_FAILURE, payload};
        const before = {isRecovering: true, recoveryErrorMessage: ''};
        const after = {isRecovering: false, recoveryErrorMessage: payload.recoveryErrorMessage};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(recovery(before, action)).toEqual(after);
    });
    it('should return initial state on unknown action', () => {
        const initialState = {
            recoveryEmail: '',
            isRecovering: false,
            isRecovered: false,
            recoveryErrorMessage: '',
        };
        const action = {type: 'UNKNOWN_ACTION'};
        const after = initialState;
        freeze(action);
        freeze(after);
        expect(recovery(undefined, action)).toEqual(after);
    });
});
