import {getProfile} from '../../services/profileService';
import * as profileActionTypes from './profileActionTypes';

export const getProfileIfNeeded = (sub) => {
    return (dispatch, getState) => {
        const {profile, auth: {token}} = getState();
        if (profile.isFetching) {
            return Promise.resolve();
        }
        dispatch(getProfileRequest());
        return getProfile(token, sub)
            .then((response) => {
                if (!response.ok) {
                    throw {message: response.statusText, code: response.status};
                }
                return response.json();
            })
            .then((json) => {
                return {...json};
            })
            .then((json) => {
                return dispatch(getProfileSuccess(getState().auth.isLoggedIn ? {...json} : {}));
            })
            .catch((error) => {
                if (getState().auth.isLoggedIn) {
                    return dispatch(getProfileFailure({message: error.message, code: error.code}));
                } else {
                    return dispatch(getProfileFailure({error: {}, message: '', code: null}));
                }
            });
    };
};
const getProfileRequest = payload => ({type: profileActionTypes.GET_PROFILE_REQUEST, payload});
const getProfileSuccess = payload => ({type: profileActionTypes.GET_PROFILE_SUCCESS, payload});
const getProfileFailure = payload => ({type: profileActionTypes.GET_PROFILE_FAILURE, payload});
