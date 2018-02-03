import activation from '../../reducers/activationReducer';
import * as activationActionTypes from '../../actions/activation/activationActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';

describe('Activation reducer', () => {
    it(`should start activation request on ${activationActionTypes.ACTIVATION_REQUEST} action`, () => {
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
    it(`should set activation success message on ${activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE} action`, () => {
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
    it(`should set activation data on ${activationActionTypes.SET_ACTIVATION_DATA} action`, () => {
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
});