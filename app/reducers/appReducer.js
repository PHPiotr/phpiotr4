import * as appActionTypes from '../actions/app/appActionTypes';

const initialState = {
    isDrawerOpen: false,
    appBarTitle: 'phpiotr 4.0',
    currentBooking: {
        label: '',
        labelPlural: '',
        id: null,
    },
};

const app = (state = initialState, {type, payload}) => {
    switch (type) {
        case appActionTypes.TOGGLE_IS_DRAWER_OPEN:
            return {...state, isDrawerOpen: !state.isDrawerOpen};
        case appActionTypes.SET_APP_BAR_TITLE:
            return {...state, appBarTitle: payload || initialState.appBarTitle};
        case appActionTypes.SET_CURRENT_BOOKING:
            return {...state, currentBooking: payload};
        default:
            return state;
    }
};

export default app;