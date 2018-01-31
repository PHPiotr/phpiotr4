import expect from 'expect';
import * as recoveryActions from '../../actions/recovery/recoveryActions';
import * as recoveryActionTypes from '../../actions/recovery/recoveryActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Recovery Actions', () => {
    it(`should create ${recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS} when logging in succeeds`, () => {
        const location = {
            host: 'www.example.com',
            hostname: 'www.example.com:4000',
            protocol: 'https',
        };
        const store = mockStore({
            recovery: {
                isRecovering: false,
                recoveryEmail: 'user@example.com',
            },
        });
        nock(apiUrl).post(`${apiPrefix}/auth/account-recovery`).reply(201);
        const expectedActions = [
            {type: recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST},
            {type: recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS},
        ];
        return store.dispatch(recoveryActions.recoverAccountIfNeeded(location))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should not create ${recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST} when recovering in progress`, () => {
        const location = {
            host: 'www.example.com',
            hostname: 'www.example.com:4000',
            protocol: 'https',
        };
        const store = mockStore({
            recovery: {
                isRecovering: true,
                recoveryEmail: 'user@example.com',
            },
        });
        return store.dispatch(recoveryActions.recoverAccountIfNeeded(location))
            .then(() => expect(store.getActions()).toEqual([]));
    });
    it(`should create ${recoveryActionTypes.SET_RECOVERY_EMAIL} when recovery email is set`, () => {
        const payload = 'user@example.com';
        const expectedAction = {
            type: recoveryActionTypes.SET_RECOVERY_EMAIL,
            payload,
        };
        expect(recoveryActions.setRecoveryEmail(payload)).toEqual(expectedAction);
    });
    it(`should create ${recoveryActionTypes.SET_IS_RECOVERED} when account recovery performed`, () => {
        const payload = true;
        const expectedAction = {
            type: recoveryActionTypes.SET_IS_RECOVERED,
            payload,
        };
        expect(recoveryActions.setIsRecovered(payload)).toEqual(expectedAction);
    });
    it(`should create ${recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE} when recovery error message set`, () => {
        const payload = 'An error occurred';
        const expectedAction = {
            type: recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE,
            payload,
        };
        expect(recoveryActions.setRecoveryErrorMessage(payload)).toEqual(expectedAction);
    });
});
