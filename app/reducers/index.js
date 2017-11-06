import {combineReducers} from 'redux';
import auth from './auth';
import report from './report';
import dateFilter from './dateFilter';
import bookings from './bookings';
import buses from './bookings/buses';
import planes from './bookings/planes';
import trains from './bookings/trains';
import hostels from './bookings/hostels';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    buses,
    planes,
    trains,
    hostels,
});

export default reducers;