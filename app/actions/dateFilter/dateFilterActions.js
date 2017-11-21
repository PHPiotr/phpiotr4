import * as dateFilterActionTypes from './dateFilterActionTypes';

export const toggleDateFilterEnabled = payload => ({type: dateFilterActionTypes.TOGGLE_DATE_FILTER_ENABLED, payload});
export const setDate = payload => ({type: dateFilterActionTypes.SET_DATE, payload});