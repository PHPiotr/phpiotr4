import expect from 'expect';
import dateFilter from '../../reducers/dateFilterReducer';
import * as dateFilterActionTypes from '../../actions/dateFilter/dateFilterActionTypes';
import deepFreeze from 'deep-freeze';

describe('dateFilterReducer', () => {

    it('should set "from" date', () => {
        const action = {
            payload: {name: 'fromDate', value: '2017-05-01'},
            type: dateFilterActionTypes.SET_DATE,
        };

        const beforeState = {
            fromDate: '',
            isDateFilterEnabled: true,
            toDate: '',
        };

        const afterState = {
            fromDate: '2017-05-01',
            isDateFilterEnabled: true,
            toDate: '',
        };

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "from" date as empty string', () => {
        const action = {
            payload: {name: 'fromDate', value: ''},
            type: dateFilterActionTypes.SET_DATE,
        };

        const beforeState = {
            fromDate: '2017-05-01',
            isDateFilterEnabled: true,
            toDate: '2017-05-31',
        };

        const afterState = {
            fromDate: '',
            isDateFilterEnabled: true,
            toDate: '2017-05-31',
        };

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "to" date', () => {
        const action = {
            payload: {name: 'toDate', value: '2017-05-31'},
            type: dateFilterActionTypes.SET_DATE,
        };

        const beforeState = {
            fromDate: '2017-05-01',
            isDateFilterEnabled: true,
            toDate: '',
        };

        const afterState = {
            fromDate: '2017-05-01',
            isDateFilterEnabled: true,
            toDate: '2017-05-31',
        };

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "to" date as empty string', () => {
        const action = {
            payload: {name: 'toDate', value: ''},
            type: dateFilterActionTypes.SET_DATE,
        };

        const beforeState = {
            fromDate: '',
            isDateFilterEnabled: true,
            toDate: '2017-05-31',
        };

        const afterState = {
            fromDate: '',
            isDateFilterEnabled: true,
            toDate: '',
        };

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it(`${dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED} should toggle date filter`, () => {
        const payload = true;
        const action = {payload, type: dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED};
        const beforeState = {isDateFilterEnabled: false};
        const afterState = {isDateFilterEnabled: payload};
        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it(`${dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED} should toggle date filter when before state undefined`, () => {
        const payload = true;
        const action = {payload, type: dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED};
        const beforeState = undefined;
        const afterState = {isDateFilterEnabled: payload, fromDate: '', toDate: ''};
        deepFreeze(action);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('undefined action type should not modify anything', () => {
        const state = {
            fromDate: '',
            toDate: '',
            isDateFilterEnabled: false,
        };
        const payload = 'whatever';
        const action = {payload, type: undefined};
        const beforeState = state;
        const afterState = state;
        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });
});