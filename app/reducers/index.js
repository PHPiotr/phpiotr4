import {combineReducers} from 'redux';
import auth from './auth';
import report from './report';
import dateFilter from './dateFilter';
import bookings from './bookings';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
})

export default reducers