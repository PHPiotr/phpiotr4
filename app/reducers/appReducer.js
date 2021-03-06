import * as appActionTypes from '../actions/app/appActionTypes';
import {HOME} from '../constants';

const initialState = {
    isDrawerOpen: false,
    appBarTitle: HOME,
    isArrowBackVisible: false,
};

const app = (state = initialState, {type, payload}) => {
    switch (type) {
        case appActionTypes.TOGGLE_IS_DRAWER_OPEN:
            return {...state, isDrawerOpen: !state.isDrawerOpen};
        case appActionTypes.SET_APP_BAR_TITLE:
            return {...state, appBarTitle: payload || initialState.appBarTitle};
        case appActionTypes.TOGGLE_ARROW_BACK:
            return {...state, isArrowBackVisible: !state.isArrowBackVisible};
        default:
            return state;
    }
};

export default app;