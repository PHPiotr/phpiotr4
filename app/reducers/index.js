import {combineReducers} from 'redux';
import auth from './authReducer';
import report from './reportReducer';
import dateFilter from './dateFilterReducer';
import bookings from './bookingReducer';
import app from './appReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    app,
});

export default reducers;