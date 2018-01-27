import moment from 'moment';
export default (date) => {
    if (typeof date === 'object') {
        return moment(date).format('DD/MM/YYYY');
    }
    if (typeof date === 'string') {
        return date.match(/\/+/) ? date : moment(date).format('DD/MM/YYYY');
    }

    return '';
};

export const formatDateTime = (datetime) => {
    if (typeof datetime === 'object') {
        return moment(datetime).format('DD/MM/YYYY HH:mm:ss');
    }
    if (typeof datetime === 'string') {
        return datetime.match(/\/+/) ? datetime : moment(datetime).format('DD/MM/YYYY HH:mm:ss');
    }

    return '';
};