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
            const booking = {_id: id};
            const data = {bookings: [booking]};
            let store;
            beforeEach(() => {
                store = mockStore({
                    bookings: {
                        [pluralToSingularMapping[label]]: {
                            data,
                            isDeleting: false,
                            isFetching: false,
                            current: {_id: id},
                            errors: {},
                            message: '',
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

            it(`should create ${bookingActionTypes.ADD_BOOKING_FAILURE} when adding of booking succeeded`, () => {
                const error = 'Booking validation failed';
                const errors = {};
                const expectedPayload = {error, errors};
                nock(apiUrl).post(`${apiPrefix}/bookings/${label}`).reply(403, expectedPayload);
                const expectedActions = [
                    {type: bookingActionTypes.ADD_BOOKING_REQUEST, payload: {label: pluralToSingularMapping[label]}},
                    {type: bookingActionTypes.ADD_BOOKING_FAILURE, payload: {label: pluralToSingularMapping[label], error, errors}},
                ];

                return store.dispatch(bookingActions.addBookingIfNeeded(pluralToSingularMapping[label], label))
                    .then(() => expect(store.getActions()).toEqual(expectedActions));
            });

            it(`should create ${bookingActionTypes.GET_BOOKING_SUCCESS} when viewing of booking succeeded`, () => {
                nock(apiUrl).get(`${apiPrefix}/bookings/${label}/${id}`).reply(200, booking);
                const expectedRequestAction = {
                    type: bookingActionTypes.GET_BOOKING_REQUEST,
                    payload: {label: pluralToSingularMapping[label]},
                };

                return store.dispatch(bookingActions.getBookingIfNeeded(pluralToSingularMapping[label], label, id))
                    .then((expectedSuccessAction) => {
                        expect(store.getActions()[0]).toEqual(expectedRequestAction);
                        expect(store.getActions()[1]).toEqual(expectedSuccessAction);
                    });
            });

            it(`should create ${bookingActionTypes.GET_BOOKING_FAILURE} when viewing of booking failed`, () => {
                const error = 'Booking not found';
                const code = 404;
                const expectedPayload = {error, code};

                nock(apiUrl).get(`${apiPrefix}/bookings/${label}/${id}`).reply(code, expectedPayload);
                const expectedRequestAction = {
                    type: bookingActionTypes.GET_BOOKING_REQUEST,
                    payload: {label: pluralToSingularMapping[label]},
                };

                return store.dispatch(bookingActions.getBookingIfNeeded(pluralToSingularMapping[label], label, id))
                    .then((expectedFailureAction) => {
                        expect(store.getActions()[0]).toEqual(expectedRequestAction);
                        expect(store.getActions()[1]).toEqual(expectedFailureAction);
                    });
            });

            it(`should create ${bookingActionTypes.EDIT_BOOKING_SUCCESS} when edition of booking succeeded`, () => {
                nock(apiUrl).put(`${apiPrefix}/bookings/${label}/${id}`).reply(204);
                const expectedActions = [
                    {
                        type: bookingActionTypes.EDIT_BOOKING_REQUEST,
                        payload: {label: pluralToSingularMapping[label]},
                    },
                    {
                        type: bookingActionTypes.EDIT_BOOKING_SUCCESS,
                        payload: {label: pluralToSingularMapping[label]},
                    },
                ];

                return store.dispatch(bookingActions.editBookingIfNeeded(pluralToSingularMapping[label], label))
                    .then(() => expect(store.getActions()).toEqual(expectedActions));
            });

            it(`should create ${bookingActionTypes.EDIT_BOOKING_FAILURE} when edition of booking failed`, () => {

                nock(apiUrl).put(`${apiPrefix}/bookings/${label}/${id}`).reply(404);
                const expectedRequestAction = {
                    type: bookingActionTypes.EDIT_BOOKING_REQUEST,
                    payload: {label: pluralToSingularMapping[label]},
                };

                return store.dispatch(bookingActions.editBookingIfNeeded(pluralToSingularMapping[label], label))
                    .then((response) => {
                        expect(store.getActions()[0]).toEqual(expectedRequestAction);
                        expect(store.getActions()[1]).toEqual(response);
                    });
            });

            it(`should create ${bookingActionTypes.SET_BOOKING_ERROR_MESSAGE} and ${bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE} when form field focused`, () => {
                const testedFieldName = 'price';
                store = mockStore({
                    bookings: {
                        [pluralToSingularMapping[label]]: {
                            errors: {[testedFieldName]: {message: 'This field is required'}},
                            message: 'You have an error',
                        },
                    },
                });
                const expectedActions = [
                    {
                        type: bookingActionTypes.SET_BOOKING_ERROR_MESSAGE,
                        payload: {label: pluralToSingularMapping[label], message: ''},
                    },
                    {
                        type: bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE,
                        payload: {label: pluralToSingularMapping[label], name: testedFieldName, value: null},
                    },
                ];

                return store.dispatch(bookingActions.handleFocus({target: {name: testedFieldName, value: ''}}, pluralToSingularMapping[label]))
                    .then(() => expect(store.getActions()).toEqual(expectedActions));
            });

            it(`should create ${bookingActionTypes.SET_BOOKING_PROPERTY} when form field changed`, () => {
                const name = 'price';
                const type = 'text';
                const value = '9.99';
                const expectedAction = {type: bookingActionTypes.SET_BOOKING_PROPERTY, payload: {label: pluralToSingularMapping[label], name, value}};
                expect(bookingActions.handleChange({target: {name, type, value}}, pluralToSingularMapping[label])).toEqual(expectedAction);
            });

            it(`should create ${bookingActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN} when delete booking button clicked`, () => {
                const expectedAction = {type: bookingActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN};
                expect(bookingActions.toggleIsBookingDeleteDialogOpen()).toEqual(expectedAction);
            });
        });
    });
});