import { combineReducers } from 'redux';
import auth from './auth';
import report from './report';
import dateFilter from './dateFilter';

const reducers = combineReducers({
    auth,
    report,
    dateFilter,
})

export default reducers