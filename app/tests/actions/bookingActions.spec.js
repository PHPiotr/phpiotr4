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
            let store;
            beforeEach(() => {
                store = mockStore({
                    bookings: {
                        [pluralToSingularMapping[label]]: {
                            data: {
                                bookings: [{_id: id}],
                            },
                            isDeleting: false,
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
        });
    });
});