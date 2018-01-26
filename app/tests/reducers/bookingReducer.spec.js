import bookingReducer from '../../reducers/bookingReducer';
import * as bookingActionTypes from '../../actions/booking/bookingActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';
import {LOGOUT} from '../../actions/auth/authActionTypes';

const initialBooking = {
    isAdd: false,
    isAdded: false,
    isAdding: false,
    isFetching: false,
    isDeleted: false,
    isDeleting: false,
    data: {},
    message: '',
    code: null,
    errors: {},
    error: {},
    current: {},
};

const initialState = {
    bus: {...initialBooking},
    plane: {...initialBooking},
    train: {...initialBooking},
    hostel: {...initialBooking},
    isBookingDeleteDialogOpen: false,
    currentBooking: {
        label: '',
        labelPlural: '',
        id: null,
    },
};

const labels = ['bus', 'plane', 'train', 'hostel'];

describe('bookingReducer', () => {
    it('should return the initial state', () => {
        expect(bookingReducer(undefined, {})).toEqual(initialState);
    });

    describe('Booking process', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.SET_BOOKING_PROPERTY} should set new value for input field of ${label} form`, () => {
                const name = 'price';
                const value = 99.99;
                const action = {type: bookingActionTypes.SET_BOOKING_PROPERTY, payload: {label, name, value}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], current: {...initialState[label]['current'], [name]: value}}};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_BOOKING_ERROR_MESSAGE} should set ${label} booking error message`, () => {
                const message = 'Test error message';
                const action = {type: bookingActionTypes.SET_BOOKING_ERROR_MESSAGE, payload: {label, message}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], message: message}};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE} should set ${label} booking field error message`, () => {
                const name = 'price';
                const value = 'Test error message';
                const action = {type: bookingActionTypes.SET_BOOKING_FIELD_ERROR_MESSAGE, payload: {label, name, value}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], errors: {...initialState[label]['errors'], [name]: value}}};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_IS_ADDED} should mark ${label} booking as added`, () => {
                const isAdded = true;
                const action = {type: bookingActionTypes.SET_IS_ADDED, payload: {label, isAdded}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isAdded: isAdded}};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_IS_DELETED} should mark ${label} booking as deleted`, () => {
                const isDeleted = true;
                const action = {type: bookingActionTypes.SET_IS_DELETED, payload: {label, isDeleted}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isDeleted: isDeleted}};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_IS_ADD} should set a flag indicating we are on add/edit ${label} booking page`, () => {
                const payload = {
                    label,
                    isAdd: true,
                    isAdded: false,
                };
                const action = {type: bookingActionTypes.SET_IS_ADD, payload};
                const before = {...initialState};
                const after = {...initialState, [label]: {
                    ...initialState[label],
                    isAdd: payload.isAdd,
                    current: {},
                    errors: {},
                    isAdded: payload.isAdd ? initialState.isAdded : false,
                }};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.SET_CURRENT_BOOKING} should set current ${label} booking`, () => {
                const payload = {};
                const action = {type: bookingActionTypes.SET_CURRENT_BOOKING, payload};
                const before = {...initialState};
                const after = {...initialState, currentBooking: payload};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
            it(`${bookingActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN} should toggle visibility of delete ${label} booking dialog`, () => {
                const action = {type: bookingActionTypes.TOGGLE_IS_BOOKING_DELETE_DIALOG_OPEN};
                const before = {...initialState};
                const after = {...initialState, isBookingDeleteDialogOpen: !initialState.isBookingDeleteDialogOpen};
                freeze(action);
                freeze(before);
                freeze(after);
                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle addition of bookings', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.ADD_BOOKING_REQUEST} should start adding ${label}`, () => {

                const action = {type: bookingActionTypes.ADD_BOOKING_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isAdding: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.ADD_BOOKING_FAILURE} should fail adding ${label}`, () => {

                const action = {type: bookingActionTypes.ADD_BOOKING_FAILURE, payload: {label, error: '', errors: {}}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {...initialState, [label]: {...initialState[label], isAdding: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.ADD_BOOKING_SUCCESS} should succeed adding ${label}`, () => {

                const action = {type: bookingActionTypes.ADD_BOOKING_SUCCESS, payload: {label}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {
                    ...initialState,
                    [label]: {
                        ...initialState[label],
                        isAdding: false,
                        isAdded: true,
                        current: {},
                    },
                };
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle edition of bookings', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.EDIT_BOOKING_REQUEST} should start editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isAdding: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.EDIT_BOOKING_FAILURE} should fail editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_FAILURE, payload: {label, error: {}}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {...initialState, [label]: {...initialState[label], isAdding: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.EDIT_BOOKING_SUCCESS} should succeed editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_SUCCESS, payload: {label}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {
                    ...initialState,
                    [label]: {
                        ...initialState[label],
                        isAdding: false,
                        isAdded: true,
                        current: {},
                    },
                };
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle edition of bookings', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.EDIT_BOOKING_REQUEST} should start editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isAdding: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.EDIT_BOOKING_FAILURE} should fail editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_FAILURE, payload: {label, error: {}}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {...initialState, [label]: {...initialState[label], isAdding: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.EDIT_BOOKING_SUCCESS} should succeed editing ${label}`, () => {

                const action = {type: bookingActionTypes.EDIT_BOOKING_SUCCESS, payload: {label}};
                const before = {...initialState, [label]: {...initialState[label], isAdding: true}};
                const after = {
                    ...initialState,
                    [label]: {
                        ...initialState[label],
                        isAdding: false,
                        isAdded: true,
                        current: {},
                    },
                };
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle getting list of bookings', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.GET_BOOKINGS_REQUEST} should start getting ${label} list`, () => {

                const action = {type: bookingActionTypes.GET_BOOKINGS_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isFetching: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.GET_BOOKINGS_FAILURE} should fail getting ${label} list`, () => {

                const action = {type: bookingActionTypes.GET_BOOKINGS_FAILURE, payload: {label, error: {}}};
                const before = {...initialState, [label]: {...initialState[label], isFetching: true}};
                const after = {
                    ...initialState,
                    [label]: {
                        ...initialState[label],
                        isFetching: false,
                        data: {...initialState[label].data, bookings: []},
                    },
                };
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.GET_BOOKINGS_SUCCESS} should succeed getting ${label} list`, () => {

                const data = {'hello': 'world'};
                const action = {type: bookingActionTypes.GET_BOOKINGS_SUCCESS, payload: {label, data}};
                const before = {...initialState, [label]: {...initialState[label], isFetching: true, code: null}};
                const after = {...initialState, [label]: {...initialState[label], isFetching: false, data, code: 200}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle getting single booking', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.GET_BOOKING_REQUEST} should start getting ${label}`, () => {

                const action = {type: bookingActionTypes.GET_BOOKING_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isFetching: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.GET_BOOKING_FAILURE} should fail getting ${label}`, () => {

                const action = {type: bookingActionTypes.GET_BOOKING_FAILURE, payload: {label, error: {}}};
                const before = {...initialState, [label]: {...initialState[label], isFetching: true}};
                const after = {...initialState, [label]: {...initialState[label], isFetching: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.GET_BOOKING_SUCCESS} should succeed getting ${label}`, () => {

                const current = {'hello': 'world'};
                const action = {type: bookingActionTypes.GET_BOOKING_SUCCESS, payload: {label, current}};
                const before = {...initialState, [label]: {...initialState[label], isFetching: true}};
                const after = {...initialState, [label]: {...initialState[label], isFetching: false, current}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });

    describe('should handle deleting single booking', () => {
        labels.forEach((label) => {
            it(`${bookingActionTypes.DELETE_BOOKING_REQUEST} should start deleting ${label}`, () => {

                const action = {type: bookingActionTypes.DELETE_BOOKING_REQUEST, payload: {label}};
                const before = {...initialState};
                const after = {...initialState, [label]: {...initialState[label], isDeleting: true, isDeleted: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.DELETE_BOOKING_FAILURE} should fail deleting ${label}`, () => {

                const action = {type: bookingActionTypes.DELETE_BOOKING_FAILURE, payload: {label, error: {}}};
                const before = {...initialState, [label]: {...initialState[label], isDeleting: true, isDeleted: false}};
                const after = {...initialState, [label]: {...initialState[label], isDeleting: false, isDeleted: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.DELETE_BOOKING_SUCCESS} should succeed deleting ${label}`, () => {

                const action = {type: bookingActionTypes.DELETE_BOOKING_SUCCESS, payload: {label}};
                const before = {...initialState, [label]: {...initialState[label], isDeleting: true, isDeleted: false}};
                const after = {
                    ...initialState,
                    [label]: {...initialState[label], isDeleting: false, isDeleted: true}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });
        });
    });
    it(`it should return bookings initial state on ${LOGOUT} action`, () => {
        const action = {type: LOGOUT};
        const before = {...initialState, isBookingDeleteDialogOpen: true};
        const after = initialState;
        freeze(action);
        freeze(before);
        freeze(after);
        expect(bookingReducer(before, action)).toEqual(initialState);
    });
});