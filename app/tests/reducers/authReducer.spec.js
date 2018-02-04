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
    it(`should not change isLoggedIn flag to true in case of ${authActionTypes.LOGIN_FAILURE} action type`, () => {
        const payload = {message: 'Some error message', errors: {some: 'input errors'}};
        const action = {type: authActionTypes.LOGIN_FAILURE, payload};
        const before = {
            isLoggingIn: true,
            isLoggedIn: false,
            token: '',
            expiresIn: 0,
        };
        const after = {
            loginErrorMessage: payload.message,
            loginErrors: payload.errors,
            isLoggingIn: false,
            isLoggedIn: false,
            token: '',
            expiresIn: 0,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(auth(before, action)).toEqual(after);
    });
    it(`should set isLoggedIn flag in case of ${authActionTypes.SET_IS_LOGGED_IN} action type`, () => {
        const action1 = {type: authActionTypes.SET_IS_LOGGED_IN, payload: true};
        const action2 = {type: authActionTypes.SET_IS_LOGGED_IN, payload: false};
        const before1 = {isLoggedIn: false};
        const before2 = {isLoggedIn: true};
        const after1 = {isLoggedIn: true};
        const after2 = {isLoggedIn: false};
        freeze(action1);
        freeze(action2);
        freeze(before1);
        freeze(before2);
        freeze(after1);
        freeze(after2);
        expect(auth(before1, action1)).toEqual(after1);
        expect(auth(before2, action1)).toEqual(after1);
        expect(auth(before1, action2)).toEqual(after2);
        expect(auth(before2, action2)).toEqual(after2);
    });
    it(`should set token value in case of ${authActionTypes.SET_TOKEN} action type`, () => {
        const payload = 'some.json.webtoken';
        const action = {type: authActionTypes.SET_TOKEN, payload};
        const before = {token: 'what.eve.r'};
        const after = {token: payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(auth(before, action)).toEqual(after);
    });
});