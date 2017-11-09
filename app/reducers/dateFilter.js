import moment from 'moment';

const initialState = {
    fromDateFieldType: 'date',
    toDateFieldType: 'text',
    fromDate: moment('2017-01-01').format('YYYY-MM-DD'),
    toDate: '',
    isDateFilterEnabled: false,
};

const dateFilter = (state = initialState, action) => {
    switch (action.type) {
    case 'TOGGLE_DATE_FILTER_ENABLED':
        return {...state, isDateFilterEnabled: action['isDateFilterEnabled']};
    case 'SET_DATE':
        return {...state, [action['dateFieldName']]: action['dateFieldValue']};
    case 'SET_DATE_TYPE':
        return {...state, [action['dateTypeName']]: action['dateTypeValue']};
    default:
        return state;
    }
};

export default dateFilter;