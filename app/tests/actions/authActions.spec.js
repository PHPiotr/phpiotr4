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
    it(`should create ${authActionTypes.SET_IS_LOGGED_IN} when is-logged-in flag is to be set`, () => {
        const payload = true;
        const type = authActionTypes.SET_IS_LOGGED_IN;
        const expectedAction = {
            type,
            payload,
        };
        expect(authActions.setIsLoggedIn(payload)).toEqual(expectedAction);
    });
    it(`should create ${authActionTypes.SET_LOGIN_ERROR_MESSAGE} when login error message is to be set`, () => {
        const payload = 'An error occurred';
        const type = authActionTypes.SET_LOGIN_ERROR_MESSAGE;
        const expectedAction = {
            type,
            payload,
        };
        expect(authActions.setLoginErrorMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${authActionTypes.TOGGLE_LOGIN_PASSWORD_VISIBILITY} when visibility of password input to be toggled`, () => {
        const type = authActionTypes.TOGGLE_LOGIN_PASSWORD_VISIBILITY;
        const expectedAction = {
            type,
        };
        expect(authActions.toggleLoginPasswordVisibility()).toEqual(expectedAction);
    });
});
