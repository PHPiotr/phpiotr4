import expect from 'expect';
import * as activationActions from '../../actions/activation/activationActions';
import * as activationActionTypes from '../../actions/activation/activationActionTypes';

describe('Activation actions', () => {
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
});
