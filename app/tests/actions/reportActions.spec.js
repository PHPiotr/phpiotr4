import expect from 'expect';
import * as reportActions from '../../actions/report/reportActions';
import * as reportActionTypes from '../../actions/report/reportActionTypes';

describe('Report Actions', () => {
    it(`should create ${reportActionTypes.TOGGLE_DETAILS_OPEN} when details toggled collapsed/expanded`, () => {
        const payload = true;
        const expectedAction = {type: reportActionTypes.TOGGLE_DETAILS_OPEN, payload};
        expect(reportActions.toggleDetailsOpen(payload)).toEqual(expectedAction);
    });
});