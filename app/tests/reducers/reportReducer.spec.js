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
});
