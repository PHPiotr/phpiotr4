import expect from 'expect';
import * as authActions from '../../actions/auth/authActions';
import * as authActionTypes from '../../actions/auth/authActionTypes';

describe('Auth Actions', () => {
    it(`should create ${authActionTypes.ON_CHANGE_LOGIN_FIELD} when login form input changes`, () => {
        const fieldName = 'price';
        const fieldValue = 9.99;
        const type = authActionTypes.ON_CHANGE_LOGIN_FIELD;
        const expectedAction = {
            type,
            fieldName,
            fieldValue,
        };
        expect(authActions.change(fieldName, fieldValue, type)).toEqual(expectedAction);
        expect(authActions.change(fieldName, fieldValue)).toEqual(expectedAction);
    });
    it(`should create ${authActionTypes.ON_FOCUS_LOGIN_FIELD} when login form input focuses`, () => {
        const fieldName = 'price';
        const fieldValue = 9.99;
        const type = authActionTypes.ON_FOCUS_LOGIN_FIELD;
        const expectedAction = {
            type,
            fieldName,
            fieldValue,
        };
        expect(authActions.focus(fieldName, fieldValue, type)).toEqual(expectedAction);
        expect(authActions.focus(fieldName, fieldValue)).toEqual(expectedAction);
    });
    it(`should create ${authActionTypes.SET_TOKEN} when token is to be set`, () => {
        const payload = 'j.w.t';
        const type = authActionTypes.SET_TOKEN;
        const expectedAction = {
            type,
            payload,
        };
        expect(authActions.setToken(payload)).toEqual(expectedAction);
    });
});
