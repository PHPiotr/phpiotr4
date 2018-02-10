import moment from 'moment';
export default (date) => {
    if (typeof date === 'object') {
        if (typeof date.toISOString === 'function') {
            date = date.toISOString();
        } else {
            return date;
        }
    }
    if (typeof date === 'string') {
        return date.match(/\/+/) ? date : moment(date).format('DD/MM/YYYY');
    }

    return '';
};

export const formatDateTime = (datetime) => {
    if (typeof datetime === 'object') {
        if (typeof datetime.toISOString === 'function') {
            datetime = datetime.toISOString();
        } else {
            return datetime;
        }
    }
    if (typeof datetime === 'string') {
        return datetime.match(/\/+/) ? datetime : moment(datetime).format('DD/MM/YYYY HH:mm:ss');
    }

    return '';
};