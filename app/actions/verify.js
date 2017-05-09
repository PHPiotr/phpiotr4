import fetch from 'isomorphic-fetch';
import {api_url} from '../../config';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_FAILURE = 'VERIFY_FAILURE';

const shouldVerify = (state) => {
    if (state === undefined) {
        return true;
    }
    if (state.auth.isVerifying) {
        return false;
    }
    return true;
};

const verifyRequest = () => ({
    type: VERIFY_REQUEST
});

const verifySuccess = (data) => ({
    type: VERIFY_SUCCESS,
    data
});

const verifyFailure = (error) => ({
    type: VERIFY_FAILURE,
    error
});

const verify = (headers) => {
    return (dispatch) => {
        dispatch(verifyRequest());
        return fetch(`${api_url}/api/v1/auth/verify`, {
            headers: headers
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    return dispatch(verifySuccess(json));
                } else {
                    throw Error('Verify failure');
                }
            })
            .catch((error) => {
                dispatch(verifyFailure(error));
            });
    };
};

export const verifyIfNeeded = (headers) => {
    return (dispatch, getState) => {

        if (shouldVerify(getState())) {
            return dispatch(verify(headers));
        }
        return Promise.resolve();
    };
};