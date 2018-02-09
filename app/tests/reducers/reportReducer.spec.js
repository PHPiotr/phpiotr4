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
    it('should return initial state on unknown action', () => {
        const initialState = {
            totalCost: 0,
            buses: [],
            busesAvg: 0,
            busesCost: 0,
            busesSinglesQuantity: 0,
            planes: [],
            planesAvg: 0,
            planesCost: 0,
            planesSinglesQuantity: 0,
            trains: [],
            trainsAvg: 0,
            trainsCost: 0,
            trainsSinglesQuantity: 0,
            hostels: [],
            hostelsAvg: 0,
            hostelsCost: 0,
            isFetching: false,
            busesDetailsOpen: false,
            planesDetailsOpen: false,
            trainsDetailsOpen: false,
            hostelsDetailsOpen: false,
        };
        const action = {type: 'UNKNOWN_ACTION'};
        const after = initialState;
        freeze(action);
        freeze(after);
        expect(report(undefined, action)).toEqual(after);
    });
});
