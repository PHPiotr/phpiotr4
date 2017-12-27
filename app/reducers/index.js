import {combineReducers} from 'redux';
import auth from './authReducer';
import report from './reportReducer';
import dateFilter from './dateFilterReducer';
import bookings from './bookingReducer';
import app from './appReducer';
import recovery from './recoveryReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    app,
    recovery,
});

export default reducers;