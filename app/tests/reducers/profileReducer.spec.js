import expect from 'expect';
import freeze from 'deep-freeze';
import profile from '../../reducers/profileReducer';
import * as profileActionTypes from '../../actions/profile/profileActionTypes';

describe('Profile', () => {
    it(`should start request on ${profileActionTypes.GET_PROFILE_REQUEST}`, () => {
        const action = {type: profileActionTypes.GET_PROFILE_REQUEST};
        const before = {isFetching: false};
        const after = {isFetching: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(profile(before, action)).toEqual(after);
    });
    it(`should succeed request on ${profileActionTypes.GET_PROFILE_SUCCESS}`, () => {
        const payload = {my: 'profile'};
        const action = {type: profileActionTypes.GET_PROFILE_SUCCESS, payload};
        const before = {isFetching: true};
        const after = {isFetching: false, ...payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(profile(before, action)).toEqual(after);
    });
});
