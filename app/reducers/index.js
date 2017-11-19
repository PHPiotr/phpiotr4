import {combineReducers} from 'redux';
import auth from './authReducer';
import report from './report';
import dateFilter from './dateFilter';
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