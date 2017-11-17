import {combineReducers} from 'redux';
import auth from './auth';
import report from './report';
import dateFilter from './dateFilter';
import bookings from './bookings';
import appReducer from './appReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    appReducer,
});

export default reducers;