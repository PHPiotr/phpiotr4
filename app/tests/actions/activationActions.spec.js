import expect from 'expect';
import * as activationActions from '../../actions/activation/activationActions';
import * as activationActionTypes from '../../actions/activation/activationActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Activation actions', () => {
    it(`should create ${activationActionTypes.ACTIVATION_SUCCESS} when activation done`, () => {
        const store = mockStore({
            auth: {
                isLoggingIn: false,
            },
        });
        const userId = 1;
        const token = 'j.w.t';
        nock(apiUrl).put(`${apiPrefix}/users/${userId}`).reply(204);
        const expectedActions = [
            {type: activationActionTypes.ACTIVATION_REQUEST},
            {
                type: activationActionTypes.ACTIVATION_SUCCESS,
                payload: 'Account activated. You can now log in.',
            },
        ];
        return store.dispatch(activationActions.activateIfNeeded(userId, token))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should create ${activationActionTypes.ACTIVATION_FAILURE} when activation failed`, () => {
        const store = mockStore({
            auth: {
                isLoggingIn: false,
            },
        });
        const userId = 1;
        const token = 'j.w.t';
        const message = 'Something went wrong';
        const payload = Error(message);
        nock(apiUrl).put(`${apiPrefix}/users/${userId}`).reply(403, payload);
        const expectedActions = [
            {type: activationActionTypes.ACTIVATION_REQUEST},
            {
                type: activationActionTypes.ACTIVATION_FAILURE,
                payload: message,
            },
        ];
        return store.dispatch(activationActions.activateIfNeeded(userId, token))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it('should create an action to set activation data', () => {
        const location = {
            host: 'www.example.com',
            hostname: 'www.example.com:4000',
            protocol: 'https',
        };
        const expectedAction = {
            type: activationActionTypes.SET_ACTIVATION_DATA,
            payload: location,
        };
        expect(activationActions.setActivationData(location)).toEqual(expectedAction);
    });
    it('should create an action to set activation error message', () => {
        const payload = 'An error occurred...';
        const expectedAction = {
            type: activationActionTypes.SET_ACTIVATION_ERROR_MESSAGE,
            payload,
        };
        expect(activationActions.setActivationErrorMessage(payload)).toEqual(expectedAction);
    });
    it('should create an action to set activation success message', () => {
        const payload = 'Success...';
        const expectedAction = {
            type: activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE,
            payload,
        };
        expect(activationActions.setActivationSuccessMessage(payload)).toEqual(expectedAction);
    });
});
