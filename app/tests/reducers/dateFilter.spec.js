import expect from 'expect';
import dateFilter from '../../reducers/dateFilterReducer';
import * as dateFilterActionTypes from '../../actions/dateFilter/dateFilterActionTypes';
import deepFreeze from 'deep-freeze';

describe('dateFilter', () => {

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
});