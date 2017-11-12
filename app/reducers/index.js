import {combineReducers} from 'redux';
import auth from './auth';
import report from './report';
import dateFilter from './dateFilter';
import bookings from './bookings';
import buses from './buses';
import planes from './planes';
import trains from './trains';
import hostels from './hostels';
import appReducer from './appReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    buses,
    planes,
    trains,
    hostels,
    appReducer,
});

export default reducers;