import * as appActionTypes from './appActionTypes';

export const toggleIsDrawerOpen = () => ({type: appActionTypes.TOGGLE_IS_DRAWER_OPEN});
export const setAppBarTitle = payload => ({type: appActionTypes.SET_APP_BAR_TITLE, payload});
export const toggleArrowBack = () => ({type: appActionTypes.TOGGLE_ARROW_BACK});
