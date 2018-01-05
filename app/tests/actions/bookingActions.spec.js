import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import 'isomorphic-fetch';
import 'babel-polyfill';
import * as bookingActions from '../../actions/booking/bookingActions';
import * as bookingActionTypes from '../../actions/booking/bookingActionTypes';

const apiUrl = 'http://localhost:8080';
const apiPrefix = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const labels = ['buses', 'planes', 'trains', 'hostels'];
const pluralToSingularMapping = {
    'buses': 'bus',
    'planes': 'plane',
    'trains': 'train',
    'hostels': 'hostel',
};

process.env.API_URL = apiUrl;
process.env.API_PREFIX = apiPrefix;

describe('bookingActions', () => {

    describe('Async', () => {

        labels.forEach((label) => {

            const id = 1;
            const data = {bookings: [{_id: id}]};
            let store;
            beforeEach(() => {
                store = mockStore({
                    bookings: {
                        [pluralToSingularMapping[label]]: {
                            data,
                            isDeleting: false,
                            isFetching: false,
                        },
                        currentBooking: {
                            label: pluralToSingularMapping[label],
                            labelPlural: label,
                            id,
                        },
                    },
                    auth: {
                        token: 'j.w.t',
                    },
                });
            });
            afterEach(() => {
                nock.cleanAll();
            });

            it(`should create ${bookingActionTypes.DELETE_BOOKING_SUCCESS} when deletion of booking done`, () => {

                nock(apiUrl).delete(`${apiPrefix}/bookings/${label}/${id}`).reply(204);
                const expectedActions = [
                    {type: bookingActionTypes.DELETE_BOOKING_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {type: bookingActionTypes.DELETE_BOOKING_SUCCESS, payload: {label: pluralToSingularMapping[label]}},
                ];

                return store.dispatch(bookingActions.deleteBookingIfNeeded())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it(`should create ${bookingActionTypes.DELETE_BOOKING_FAILURE} when deletion of booking failed`, () => {

                const expectedPayload = Error('Unauthorized');
                nock(apiUrl).delete(`${apiPrefix}/bookings/${label}/${id}`).reply(401, expectedPayload);
                const expectedActions = [
                    {type: bookingActionTypes.DELETE_BOOKING_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {
                        type: bookingActionTypes.DELETE_BOOKING_FAILURE,
                        payload: {error: expectedPayload, label: pluralToSingularMapping[label]},
                    },
                ];

                return store.dispatch(bookingActions.deleteBookingIfNeeded())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it(`should create ${bookingActionTypes.GET_BOOKINGS_SUCCESS} when listing of bookings succeeded`, () => {

                const type = 'current';
                const page = 1;

                nock(apiUrl).get(`${apiPrefix}/bookings/${label}?type=${type}&page=${page}`).reply(200, data);
                const expectedActions = [
                    {type: bookingActionTypes.GET_BOOKINGS_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {type: bookingActionTypes.GET_BOOKINGS_SUCCESS, payload: {label: pluralToSingularMapping[label], data}},
                ];

                return store.dispatch(bookingActions.getBookingsIfNeeded(pluralToSingularMapping[label], label, type, page))
                    .then((response) => {
                        expect(response.type).toEqual(bookingActionTypes.GET_BOOKINGS_SUCCESS);
                        expect(response.payload.data).toEqual(data);
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it(`should create ${bookingActionTypes.GET_BOOKINGS_FAILURE} when listing of bookings failed`, () => {

                const type = 'current';
                const page = 1;
                const code = 403;
                const message = 'Forbidden';
                const error = {code, message};

                nock(apiUrl).get(`${apiPrefix}/bookings/${label}?type=${type}&page=${page}`).reply(403, error);
                const expectedActions = [
                    {type: bookingActionTypes.GET_BOOKINGS_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {type: bookingActionTypes.GET_BOOKINGS_FAILURE, payload: {label: pluralToSingularMapping[label], error, code, message}},
                ];

                return store.dispatch(bookingActions.getBookingsIfNeeded(pluralToSingularMapping[label], label, type, page))
                    .then((response) => {
                        expect(response.type).toEqual(bookingActionTypes.GET_BOOKINGS_FAILURE);
                        expect(response.payload.code).toEqual(code);
                        expect(response.payload.message).toEqual(message);
                        expect(response.payload.error).toEqual(error);
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it(`should create ${bookingActionTypes.ADD_BOOKING_SUCCESS} when adding of booking succeeded`, () => {
                nock(apiUrl).post(`${apiPrefix}/bookings/${label}`).reply(201);
                const expectedActions = [
                    {type: bookingActionTypes.ADD_BOOKING_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {type: bookingActionTypes.ADD_BOOKING_SUCCESS, payload: {label: pluralToSingularMapping[label]}},
                ];

                return store.dispatch(bookingActions.addBookingIfNeeded(pluralToSingularMapping[label], label))
                    .then(() => expect(store.getActions()).toEqual(expectedActions));
            });
        });
    });
});