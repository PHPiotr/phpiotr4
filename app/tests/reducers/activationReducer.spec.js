import activation from '../../reducers/activationReducer';
import * as activationActionTypes from '../../actions/activation/activationActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';

describe('Activation reducer', () => {
    it(`should set ${activationActionTypes.ACTIVATION_REQUEST} action`, () => {
        const action = {
            type: activationActionTypes.ACTIVATION_REQUEST,
        };

        const beforeState = {
            isActivating: false,
        };

        const afterState = {
            isActivating: true,
        };

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
    });
    it(`should set ${activationActionTypes.ACTIVATION_SUCCESS} action`, () => {
        const payload = 'Success';
        const action = {
            type: activationActionTypes.ACTIVATION_SUCCESS,
            payload,
        };

        const beforeState = {
            isActivating: true,
            activationSuccessMessage: '',
        };

        const afterState = {
            isActivating: false,
            activationSuccessMessage: payload,
        };

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
    });
    it(`should set ${activationActionTypes.ACTIVATION_FAILURE} action`, () => {
        const payload = 'Failure';
        const action = {
            type: activationActionTypes.ACTIVATION_FAILURE,
            payload,
        };

        const beforeState = {
            isActivating: true,
            activationErrorMessage: '',
        };

        const afterState = {
            isActivating: false,
            activationErrorMessage: payload,
        };

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
    });
    it(`should set ${activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE} action`, () => {
        const payload = 'Success';
        const action = {
            payload,
            type: activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE,
        };

        const beforeState = {
            activationSuccessMessage: '',
        };

        const afterState = {
            activationSuccessMessage: payload,
        };

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
    });
    it(`should set ${activationActionTypes.SET_ACTIVATION_DATA} action`, () => {
        const payload = {
            protocol: 'http:',
            host: 'example.com:3000',
            hostname: 'example.com',
        };
        const action = {
            payload,
            type: activationActionTypes.SET_ACTIVATION_DATA,
        };

        const beforeState = {
            activationUrl: '',
            activationFromEmail: '',
        };

        const afterState = {
            activationUrl: `${payload.protocol}//${payload.host}/register`,
            activationFromEmail: `no-reply@${payload.hostname}`,
        };

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
    });
    it('should set initial state', () => {
        const initialState = {
            activationUrl: '',
            activationFromEmail: '',
            isActivating: false,
            activationErrorMessage: '',
            activationSuccessMessage: '',
        };
        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const beforeState = initialState;
        const afterState = initialState;

        freeze(action);
        freeze(beforeState);
        freeze(afterState);

        expect(activation(beforeState, action)).toEqual(afterState);
        expect(activation(undefined, action)).toEqual(afterState);
    });
});