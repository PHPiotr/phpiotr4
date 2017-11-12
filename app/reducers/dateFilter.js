const initialState = {
    fromDate: '',
    toDate: '',
    isDateFilterEnabled: false,
};

const dateFilter = (state = initialState, action) => {
    switch (action.type) {
    case 'TOGGLE_DATE_FILTER_ENABLED':
        return {...state, isDateFilterEnabled: action['isDateFilterEnabled']};
    case 'SET_DATE':
        return {...state, [action['dateFieldName']]: action['dateFieldValue']};
    default:
        return state;
    }
};

export default dateFilter;