import expect from 'expect';
import freeze from 'deep-freeze';
import report from '../../reducers/reportReducer';
import * as reportActionTypes from '../../actions/report/reportActionTypes';

describe('Report', () => {
    it(`should start request on ${reportActionTypes.REPORT_REQUEST}`, () => {
        const action = {type: reportActionTypes.REPORT_REQUEST};
        const before = {isFetching: false};
        const after = {isFetching: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(report(before, action)).toEqual(after);
    });
    it(`should succeed request on ${reportActionTypes.REPORT_SUCCESS}`, () => {
        const data = {some: 'data'};
        const receivedAt = new Date();
        const action = {type: reportActionTypes.REPORT_SUCCESS, data, receivedAt};
        const before = {isFetching: true};
        const after = {isFetching: false, receivedAt, ...data};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(report(before, action)).toEqual(after);
    });
    it(`should fail request on ${reportActionTypes.REPORT_FAILURE}`, () => {
        const error = 'Error';
        const action = {type: reportActionTypes.REPORT_FAILURE, error};
        const before = {isFetching: true};
        const after = {isFetching: false, error};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(report(before, action)).toEqual(after);
    });
    it(`should toggle details on/off on ${reportActionTypes.TOGGLE_DETAILS_OPEN}`, () => {
        const payload = 'buses';
        const action = {type: reportActionTypes.TOGGLE_DETAILS_OPEN, payload};
        const before = {
            [`${payload}DetailsOpen`]: false,
        };
        const after = {[`${payload}DetailsOpen`]: !before[`${payload}DetailsOpen`]};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(report(before, action)).toEqual(after);
    });
});
