import expect from 'expect';
import * as authActions from '../../actions/auth/authActions';
import * as authActionTypes from '../../actions/auth/authActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions', () => {
    it(`should create ${authActionTypes.LOGIN_SUCCESS} when logging in succeeds`, () => {
        const username = 'hello';
        const password = 'world';
        const store = mockStore({
            auth: {
                isLoggingIn: false,
                isLoggedIn: false,
                login: {
                    username,
                    password,
                },
            },
        });
        const basic = 'base64encodedstring';
        const payload = {
            token: 'j.w.t',
            expiresIn: 3600,
        };
        nock(apiUrl).get(`${apiPrefix}/auth/login`).reply(200, payload);
        const expectedActions = [
            {type: authActionTypes.LOGIN_REQUEST},
            {
                type: authActionTypes.LOGIN_SUCCESS,
                payload,
            },
        ];
        return store.dispatch(authActions.loginIfNeeded(basic))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should create ${authActionTypes.LOGIN_FAILURE} when logging in fails`, () => {
        const username = 'hello';
        const password = 'world';
        const store = mockStore({
            auth: {
                isLoggingIn: false,
                isLoggedIn: false,
                login: {
                    username,
                    password,
                },
            },
        });
        const basic = 'base64encodedstring';
        const payload = {
            error: new Error('An error occurred'),
            errors: {some: 'input error'},
        };
        nock(apiUrl).get(`${apiPrefix}/auth/login`).reply(401, payload);
        const expectedActions = [
            {type: authActionTypes.LOGIN_REQUEST},
            {
                type: authActionTypes.LOGIN_FAILURE,
                payload: {
                    errors: {some: 'input error'},
                    message: {},
                },
            },
        ];
        return store.dispatch(authActions.loginIfNeeded(basic))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should not create ${authActionTypes.LOGIN_REQUEST} when logging in in progress`, () => {
        const username = 'hello';
        const password = 'world';
        const store = mockStore({
            auth: {
                isLoggingIn: true,
                isLoggedIn: false,
                login: {
                    username,
                    password,
                },
            },
        });
        const basic = 'base64encodedstring';
        return store.dispatch(authActions.loginIfNeeded(basic))
            .then(() => expect(store.getActions()).toEqual([]));
    });
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
    it(`should create ${authActionTypes.LOGOUT} when user is to be logged out`, () => {
        const store = mockStore({
            auth: {
                isLoggingIn: false,
            },
        });
        const type = authActionTypes.LOGOUT;
        const expectedActions = [{
            type,
        }];
        store.dispatch(authActions.logoutIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
});
