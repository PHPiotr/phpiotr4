import expect from 'expect';
import freeze from 'deep-freeze';
import passwordReset from '../../reducers/passwordResetReducer';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';

describe('Password Reset', () => {
    it(`should set input value on ${passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE}`, () => {
        const payload = {
            name: 'password',
            value: 'some password value',
        };
        const action = {
            type: passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE,
            payload,
        };
        const before = {
            [payload.name]: '',
        };
        const after = {
            [payload.name]: payload.value,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should set error message on ${passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE}`, () => {
        const payload = 'Some error message';
        const action = {
            type: passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE,
            payload,
        };
        const before = {
            passwordResetErrorMessage: '',
        };
        const after = {
            passwordResetErrorMessage: payload,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should remove errors on ${passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD}`, () => {
        const payload = 'password';
        const action = {
            type: passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD,
            payload,
        };
        const before = {
            passwordResetErrorMessage: 'Some error message',
            passwordResetInputErrors: {
                [payload] : {
                    message: 'Some input error message',
                },
            },
        };
        const after = {
            passwordResetErrorMessage: '',
            passwordResetInputErrors: {
                [payload] : {},
            },
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should set isReset flag on ${passwordResetActionTypes.SET_IS_RESET_PASSWORD}`, () => {
        const payload = true;
        const action = {
            type: passwordResetActionTypes.SET_IS_RESET_PASSWORD,
            payload,
        };
        const before = {
            isReset: false,
        };
        const after = {
            isReset: payload,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should set isResetting flag on ${passwordResetActionTypes.RESET_PASSWORD_REQUEST}`, () => {
        const action = {
            type: passwordResetActionTypes.RESET_PASSWORD_REQUEST,
        };
        const before = {
            isResetting: false,
        };
        const after = {
            isResetting: true,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should set success data on ${passwordResetActionTypes.RESET_PASSWORD_SUCCESS}`, () => {
        const action = {
            type: passwordResetActionTypes.RESET_PASSWORD_SUCCESS,
        };
        const before = {
            isResetting: true,
            isReset: false,
            password: '1Qwertyuiop2@',
            repeatPassword: '1Qwertyuiop2@',
            passwordResetErrorMessage: 'There might have been some error here',
        };
        const after = {
            isResetting: false,
            isReset: true,
            password: '',
            repeatPassword: '',
            passwordResetErrorMessage: '',
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should set failure data on ${passwordResetActionTypes.RESET_PASSWORD_FAILURE}`, () => {
        const payload = {
            passwordResetErrorMessage: 'Some error',
            passwordResetInputErrors: {
                password: {
                    message: 'Some error',
                },
            },
        };
        const action = {
            type: passwordResetActionTypes.RESET_PASSWORD_FAILURE,
            payload,
        };
        const before = {
            isResetting: false,
            passwordResetErrorMessage: '',
            passwordResetInputErrors: {},
        };
        const after = {
            isResetting: false,
            passwordResetErrorMessage: payload.passwordResetErrorMessage,
            passwordResetInputErrors: payload.passwordResetInputErrors,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it(`should toggle password input visibility on/off in case of ${passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY}`, () => {
        const payload = 'showPassword';
        const action = {
            type: passwordResetActionTypes.TOGGLE_PASSWORD_VISIBILITY,
            payload,
        };
        const before = {
            [payload]: true,
        };
        const after = {
            [payload]: !before[payload],
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(passwordReset(before, action)).toEqual(after);
    });
    it('should return initial state on not known action type', () => {
        const initialState = {
            password: '',
            repeatPassword: '',
            isResetting: false,
            isReset: false,
            passwordResetErrorMessage: '',
            passwordResetInputErrors: {
                password: {},
                repeatPassword: {},
            },
            showPassword: false,
            showRepeatPassword: false,
        };
        const action = {
            type: 'UNKNOWN_ACTION',
        };
        const after = initialState;
        freeze(action);
        freeze(after);
        expect(passwordReset(undefined, action)).toEqual(after);
    });
});
