import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import 'isomorphic-fetch';
import 'babel-polyfill';
import * as profileActions from '../../actions/profile/profileActions';
import * as profileActionTypes from '../../actions/profile/profileActionTypes';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

process.env.API_URL = apiUrl;
process.env.API_PREFIX = apiPrefix;

describe('Profile Actions', () => {
    const login = 'login';
    const email = 'email@example.com';
    const createdAt = '2018-01-27';
    const updatedAt = '2018-01-28';
    let store;
    beforeEach(() => {
        store = mockStore({
            profile: {
                isFetching: false,
                login,
                email,
                createdAt,
                updatedAt,
            },
            auth: {
                token: 'j.w.t',
                isLoggedIn: true,
            },
        });
    });
    afterEach(() => {
        nock.cleanAll();
    });

    it(`should create ${profileActionTypes.GET_PROFILE_REQUEST} when GET request for view profile starts`, () => {
        const expectedPayload = {
            login,
            email,
            createdAt,
            updatedAt,
        };
        nock(apiUrl).get(`${apiPrefix}/users/current`).reply(200, expectedPayload);
        const expectedActions = [
            {type: profileActionTypes.GET_PROFILE_REQUEST},
            {
                type: profileActionTypes.GET_PROFILE_SUCCESS,
                payload: expectedPayload,
            },
        ];
        return store.dispatch(profileActions.getProfileIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
});