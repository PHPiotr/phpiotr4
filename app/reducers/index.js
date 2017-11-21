import {combineReducers} from 'redux';
import auth from './authReducer';
import report from './reportReducer';
import dateFilter from './dateFilterReducer';
import bookings from './bookingReducer';
import appReducer from './appReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    appReducer,
});

export default reducers;