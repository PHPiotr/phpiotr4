import expect from 'expect';
import auth from '../../reducers/authReducer';
import * as authActionTypes from '../../actions/auth/authActionTypes';
import freeze from 'deep-freeze';

describe('Auth reducer', () => {
    it(`should set isLoggingIn flag to true in case of ${authActionTypes.LOGIN_REQUEST} action type`, () => {
        const action = {type: authActionTypes.LOGIN_REQUEST};
        const before = {isLoggingIn: false};
        const after = {isLoggingIn: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(auth(before, action)).toEqual(after);
    });
    it(`should not change isLoggingIn flag if it is already true in case of ${authActionTypes.LOGIN_REQUEST} action type`, () => {
        const action = {type: authActionTypes.LOGIN_REQUEST};
        const before = {isLoggingIn: true};
        const after = {isLoggingIn: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(auth(before, action)).toEqual(after);
    });
    it(`should change isLoggedIn flag to true in case of ${authActionTypes.LOGIN_SUCCESS} action type`, () => {
        const payload = {token: 'j.w.t', expiresIn: Date()};
        const action = {type: authActionTypes.LOGIN_SUCCESS, payload};
        const before = {isLoggingIn: true, isLoggedIn: false, token: '', expiresIn: 0};
        const after = {...payload, isLoggingIn: false, isLoggedIn: true, login: {}};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(auth(before, action)).toEqual(after);
    });
});