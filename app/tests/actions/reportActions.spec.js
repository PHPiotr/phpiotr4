import expect from 'expect';
import * as reportActions from '../../actions/report/reportActions';
import * as reportActionTypes from '../../actions/report/reportActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import 'babel-polyfill';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Report Actions', () => {
    it(`should create ${reportActionTypes.TOGGLE_DETAILS_OPEN} when details toggled collapsed/expanded`, () => {
        const payload = true;
        const expectedAction = {type: reportActionTypes.TOGGLE_DETAILS_OPEN, payload};
        expect(reportActions.toggleDetailsOpen(payload)).toEqual(expectedAction);
    });
    it(`should create ${reportActionTypes.REPORT_SUCCESS} when report fetched`, () => {
        const store = mockStore({
            report: {
                isFetching: false,
            },
            auth: {
                isLoggingIn: false,
                isLoggedIn: true,
                token: 'j.w.t',
            },
            dateFilter: {
                fromDate: '',
                toDate: '',
            },
        });
        const data = {hello: 'world'};
        const expectedActions = [
            {type: reportActionTypes.REPORT_REQUEST},
            {type: reportActionTypes.REPORT_SUCCESS, data},
        ];
        nock(apiUrl).get(`${apiPrefix}/report?from=&to=`).reply(200, data);
        return store.dispatch(reportActions.fetchReportIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should create ${reportActionTypes.REPORT_FAILURE} when report fetching failed`, () => {
        const store = mockStore({
            report: {
                isFetching: false,
            },
            auth: {
                isLoggedIn: false,
            },
            dateFilter: {
                fromDate: '',
                toDate: '',
            },
        });
        const error = Error('Forbidden');
        const expectedActions = [
            {type: reportActionTypes.REPORT_REQUEST},
            {type: reportActionTypes.REPORT_FAILURE, error},
        ];
        nock(apiUrl).get(`${apiPrefix}/report?from=&to=`).reply(403, error);
        return store.dispatch(reportActions.fetchReportIfNeeded())
            .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it(`should not create ${reportActionTypes.REPORT_REQUEST} when report is already being fetched`, () => {
        const store = mockStore({
            report: {
                isFetching: true,
            },
        });
        return store.dispatch(reportActions.fetchReportIfNeeded())
            .then(() => expect(store.getActions()).toEqual([]));
    });
});