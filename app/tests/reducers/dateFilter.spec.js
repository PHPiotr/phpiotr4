import expect from 'expect';
import dateFilter from '../../reducers/dateFilter';
import deepFreeze from 'deep-freeze';

describe('dateFilter', () => {

    it('should set "from" date', () => {
        const action = {
            dateFieldName: 'fromDate',
            dateFieldValue: '2017-05-01',
            type: 'SET_DATE',
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
            dateFieldName: 'fromDate',
            dateFieldValue: '',
            type: 'SET_DATE',
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
            dateFieldName: 'toDate',
            dateFieldValue: '2017-05-31',
            type: 'SET_DATE',
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
            dateFieldName: 'toDate',
            dateFieldValue: '',
            type: 'SET_DATE',
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