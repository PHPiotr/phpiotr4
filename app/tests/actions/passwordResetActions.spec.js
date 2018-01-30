import expect from 'expect';
import * as passwordResetActions from '../../actions/passwordReset/passwordResetActions';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';
//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';
//import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

//const apiUrl = 'http://localhost:8080';
//const apiPrefix = '/api/v1';
//const middlewares = [thunk];
//const mockStore = configureMockStore(middlewares);

describe('Password Reset Actions', () => {
    it(`should create ${passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY} when password input visibility toggled`, () => {
        const payloads = ['password', 'repeatPassword'];
        payloads.forEach((payload) => {
            const expectedAction = {
                type: passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY,
                payload,
            };
            expect(passwordResetActions.togglePasswordVisibility(payload)).toEqual(expectedAction);
        });
    });
});
