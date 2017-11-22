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