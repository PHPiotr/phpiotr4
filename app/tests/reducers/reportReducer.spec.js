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
});
