import expect from 'expect';
import * as registrationActions from '../../actions/registration/registrationActions';
import * as registrationActionTypes from '../../actions/registration/registrationActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Registration Actions', () => {
    it(`should create ${registrationActionTypes.REGISTRATION_SUCCESS} when registration succeeds`, () => {
        const store = mockStore({
            registration: {
                registration: {
                    username: 'hello',
                    email: 'hello@example.com',
                    password: '1Qwertyuiop2@',
                    repeatPassword: '1Qwertyuiop2@',

                },
            },
            auth: {
                isLoggingIn: false,
                isLoggedIn: false,
                activationUrl: 'http://www.example.com',
                activationFromEmail: 'user@example.com',
            },
        });
        nock(apiUrl).post(`${apiPrefix}/users`).reply(201);
        const expectedActions = [
            {type: registrationActionTypes.REGISTRATION_REQUEST},
            {
                type: registrationActionTypes.REGISTRATION_SUCCESS,
                payload: 'Account created. We have sent you an email with activation instructions.',
            },
        ];
        return store.dispatch(registrationActions.registerIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should create ${registrationActionTypes.REGISTRATION_FAILURE} when logging in fails`, () => {
        const store = mockStore({
            registration: {
                registration: {
                    username: 'hello',
                    email: 'hello@example.com',
                    password: '1Qwertyuiop2@',
                    repeatPassword: '1Qwertyuiop2@',

                },
            },
            auth: {
                isLoggingIn: false,
                isLoggedIn: false,
                activationUrl: 'http://www.example.com',
                activationFromEmail: 'user@example.com',
            },
        });
        const payload = {
            error: {},
            errors: {},
        };
        nock(apiUrl).post(`${apiPrefix}/users`).reply(422, payload);
        const expectedActions = [
            {type: registrationActionTypes.REGISTRATION_REQUEST},
            {
                type: registrationActionTypes.REGISTRATION_FAILURE,
                payload,
            },
        ];
        return store.dispatch(registrationActions.registerIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should not create ${registrationActionTypes.REGISTRATION_REQUEST} when user logged in`, () => {
        const store = mockStore({
            auth: {
                isLoggedIn: true,
            },
        });
        return store.dispatch(registrationActions.registerIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]));
    });
    it(`should create ${registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD} on input change`, () => {
        const fieldName = 'password';
        const fieldValue = '1Qwertyuiop2@';
        const expectedAction = {
            type: registrationActionTypes.ON_CHANGE_REGISTRATION_FIELD,
            fieldName,
            fieldValue,
        };
        expect(registrationActions.change(fieldName, fieldValue)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD} on input focus`, () => {
        const fieldName = 'password';
        const fieldValue = '1Qwertyuiop2@';
        const expectedAction = {
            type: registrationActionTypes.ON_FOCUS_REGISTRATION_FIELD,
            fieldName,
            fieldValue,
        };
        expect(registrationActions.focus(fieldName, fieldValue)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE} when error message set`, () => {
        const payload = 'An error occurred';
        const expectedAction = {
            type: registrationActionTypes.SET_REGISTRATION_ERROR_MESSAGE,
            payload,
        };
        expect(registrationActions.setRegistrationErrorMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE} when success message set`, () => {
        const payload = 'Success message';
        const expectedAction = {
            type: registrationActionTypes.SET_REGISTRATION_SUCCESS_MESSAGE,
            payload,
        };
        expect(registrationActions.setRegistrationSuccessMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY} when visibility of password toggled`, () => {
        const expectedAction = {
            type: registrationActionTypes.TOGGLE_REGISTRATION_PASSWORD_VISIBILITY,
        };
        expect(registrationActions.toggleRegistrationPasswordVisibility()).toEqual(expectedAction);
    });
    it(`should create ${registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY} when visibility of repeat-password toggled`, () => {
        const expectedAction = {
            type: registrationActionTypes.TOGGLE_REGISTRATION_REPEAT_PASSWORD_VISIBILITY,
        };
        expect(registrationActions.toggleRegistrationRepeatPasswordVisibility()).toEqual(expectedAction);
    });
});