import expect from 'expect';
import * as passwordResetActions from '../../actions/passwordReset/passwordResetActions';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Password Reset Actions', () => {
    it(`should create ${passwordResetActionTypes.RESET_PASSWORD_SUCCESS} when password reset done`, () => {
        const password = '1Qwertyuiop2@';
        const store = mockStore({
            passwordReset: {
                isResetting: false,
                password,
                repeatPassword: password,
            },
        });
        const userId = 1;
        const token = 'j.w.t';
        nock(apiUrl).patch(`${apiPrefix}/users/${userId}`).reply(204);
        const expectedActions = [
            {type: passwordResetActionTypes.RESET_PASSWORD_REQUEST},
            {type: passwordResetActionTypes.RESET_PASSWORD_SUCCESS},
        ];
        return store.dispatch(passwordResetActions.resetPasswordIfNeeded(userId, token, {
            newPassword: password,
            newPasswordRepeat: password,
        }))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should create ${passwordResetActionTypes.RESET_PASSWORD_FAILURE} when password reset failed`, () => {
        const password = '1Qwertyuiop2@';
        const store = mockStore({
            passwordReset: {
                isResetting: false,
                password,
                repeatPassword: password,
            },
        });
        const userId = 1;
        const token = 'j.w.t';
        const passwordResetErrorMessage = 'Something went wrong';
        const passwordResetInputErrors = {some: 'errors'};
        nock(apiUrl).patch(`${apiPrefix}/users/${userId}`).reply(403, {
            err: {
                message: passwordResetErrorMessage,
                errors: passwordResetInputErrors,
            },
        });
        const expectedActions = [
            {type: passwordResetActionTypes.RESET_PASSWORD_REQUEST},
            {
                type: passwordResetActionTypes.RESET_PASSWORD_FAILURE,
                payload: {passwordResetErrorMessage, passwordResetInputErrors},
            },
        ];
        return store.dispatch(passwordResetActions.resetPasswordIfNeeded(userId, token, {
            newPassword: password,
            newPasswordRepeat: password,
        }))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should not create ${passwordResetActionTypes.RESET_PASSWORD_REQUEST} when user currently resetting password`, () => {
        const password = '1Qwertyuiop2@';
        const store = mockStore({
            passwordReset: {
                isResetting: true,
            },
        });
        const userId = 1;
        const token = 'j.w.t';
        return store.dispatch(passwordResetActions.resetPasswordIfNeeded(userId, token, {
            newPassword: password,
            newPasswordRepeat: password,
        }))
            .then(() => expect(store.getActions()).toEqual([]));
    });
    it(`should create ${passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE} when password input value set`, () => {
        const payload = 'qwerty';
        const expectedAction = {
            type: passwordResetActionTypes.SET_RESET_PASSWORD_INPUT_VALUE,
            payload,
        };
        expect(passwordResetActions.setResetPasswordInputValue(payload)).toEqual(expectedAction);
    });
    it(`should create ${passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE} when reset-password error message set`, () => {
        const payload = 'error message';
        const expectedAction = {
            type: passwordResetActionTypes.SET_RESET_PASSWORD_ERROR_MESSAGE,
            payload,
        };
        expect(passwordResetActions.setResetPasswordErrorMessage(payload)).toEqual(expectedAction);
    });
    it(`should create ${passwordResetActionTypes.SET_IS_RESET_PASSWORD} when reset-password done`, () => {
        const payload = true;
        const expectedAction = {
            type: passwordResetActionTypes.SET_IS_RESET_PASSWORD,
            payload,
        };
        expect(passwordResetActions.setIsResetPassword(payload)).toEqual(expectedAction);
    });
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
    it(`should create ${passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD}`, () => {
        const payloads = ['password', 'repeatPassword'];
        payloads.forEach((payload) => {
            const expectedAction = {
                type: passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD,
                payload,
            };
            expect(passwordResetActions.onFocusPasswordResetField(payload)).toEqual(expectedAction);
        });
    });
});
