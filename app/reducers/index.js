import {combineReducers} from 'redux';
import auth from './authReducer';
import report from './reportReducer';
import dateFilter from './dateFilterReducer';
import bookings from './bookingReducer';
import app from './appReducer';
import recovery from './recoveryReducer';
import passwordReset from './passwordResetReducer';
import registration from './registrationReducer';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
    bookings,
    app,
    recovery,
    passwordReset,
    registration,
});

export default reducers;