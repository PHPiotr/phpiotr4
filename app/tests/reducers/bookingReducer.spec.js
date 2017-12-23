import bookingReducer from '../../reducers/bookingReducer';
import * as bookingActionTypes from '../../actions/booking/bookingActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';

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
                const after = {...initialState, [label]: {...initialState[label], isFetching: false}};
                freeze(action);
                freeze(before);
                freeze(after);

                expect(bookingReducer(before, action)).toEqual(after);
            });

            it(`${bookingActionTypes.GET_BOOKINGS_SUCCESS} should succeed getting ${label} list`, () => {

                const data = {'hello': 'world'};
                const action = {type: bookingActionTypes.GET_BOOKINGS_SUCCESS, payload: {label, data}};
                const before = {...initialState, [label]: {...initialState[label], isFetching: true}};
                const after = {...initialState, [label]: {...initialState[label], isFetching: false, data}};
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
});