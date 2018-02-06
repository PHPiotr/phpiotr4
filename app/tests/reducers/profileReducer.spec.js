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
});
