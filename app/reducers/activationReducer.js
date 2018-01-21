import * as activationActionTypes from '../actions/activation/activationActionTypes';

const initialState = {
    activationUrl: '',
    activationFromEmail: '',
    isActivating: false,
    activationErrorMessage: '',
    activationSuccessMessage: '',
};

const activation = (state = initialState, action) => {
    switch (action.type) {
        case activationActionTypes.ACTIVATION_REQUEST:
            return {...state, isActivating: true};
        case activationActionTypes.ACTIVATION_SUCCESS:
            return {
                ...state,
                isActivating: false,
                activationSuccessMessage: action.payload,
            };
        case activationActionTypes.ACTIVATION_FAILURE:
            return {
                ...state,
                isActivating: false,
                activationErrorMessage: action.payload,
            };
        case activationActionTypes.SET_ACTIVATION_DATA:
            return {
                ...state,
                activationUrl: `${action.payload.protocol}//${action.payload.host}/register`,
                activationFromEmail: `no-reply@${action.payload.hostname}`,
            };
        case activationActionTypes.SET_ACTIVATION_SUCCESS_MESSAGE:
            return {...state, activationSuccessMessage: action.payload};
        default:
            return state;
    }
};

export default activation;