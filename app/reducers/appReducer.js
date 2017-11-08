import {TOGGLE_IS_DRAWER_OPEN} from '../actions/appActions';

const initialState = {
    isDrawerOpen: false,
    appBarTitle: 'phpiotr 4.0',
};

const appReducer = (state = initialState, {type}) => {
    switch (type) {
    case TOGGLE_IS_DRAWER_OPEN:
        return {...state, isDrawerOpen: !state.isDrawerOpen};
    default:
        return state;
    }
};

export default appReducer;