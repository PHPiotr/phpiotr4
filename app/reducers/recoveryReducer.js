import * as recoveryActionTypes from '../actions/recovery/recoveryActionTypes';

const initialState = {
    recoveryEmail: '',
    isRecovering: false,
    isRecovered: false,
    recoveryErrorMessage: '',
};

const recovery = (state = initialState, action) => {
    switch (action.type) {
        case recoveryActionTypes.SET_RECOVERY_EMAIL:
            return {...state, recoveryEmail: action.payload};
        case recoveryActionTypes.SET_IS_RECOVERED:
            return {...state, isRecovered: action.payload};
        case recoveryActionTypes.SET_RECOVERY_ERROR_MESSAGE:
            return {...state, recoveryErrorMessage: action.payload};
        case recoveryActionTypes.ACCOUNT_RECOVERY_REQUEST:
            return {...state, isRecovering: true};
        case recoveryActionTypes.ACCOUNT_RECOVERY_SUCCESS:
            return {...state, isRecovering: false, recoveryEmail: '', isRecovered: true};
        case recoveryActionTypes.ACCOUNT_RECOVERY_FAILURE:
            return {...state, isRecovering: false, recoveryErrorMessage: action.payload.recoveryErrorMessage};
        default:
            return state;
    }
};

export default recovery;