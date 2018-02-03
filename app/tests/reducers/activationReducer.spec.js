import activation from '../../reducers/activationReducer';
import * as activationActionTypes from '../../actions/activation/activationActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';

describe('Activation reducer', () => {
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
});