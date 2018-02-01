import expect from 'expect';
import * as dateFilterActions from '../../actions/dateFilter/dateFilterActions';
import * as dateFilterActionTypes from '../../actions/dateFilter/dateFilterActionTypes';

describe('Date Filter Actions', () => {
    it(`should create ${dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED} when date filters toggled on/off`, () => {
        const payload = true;
        const expectedAction = {
            type: dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED,
            payload,
        };
        expect(dateFilterActions.toggleDateFilterEnabled(payload)).toEqual(expectedAction);
    });
});