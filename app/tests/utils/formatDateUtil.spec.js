import expect from 'expect';
import moment from 'moment';
import formatDate, {formatDateTime} from '../../utils/formatDateUtil';

describe('Utils - format date', () => {
    it('should return formatted date string', () => {
        const date1 = (new Date()).toISOString();
        const date2 = undefined;
        const date3 = new Date();
        const date4 = {};
        const date5 = '01/01/2019';
        expect(formatDate(date1)).toEqual(moment(date1).format('DD/MM/YYYY'));
        expect(formatDate(date2)).toEqual('');
        expect(formatDate(date3)).toEqual(moment(date3.toISOString()).format('DD/MM/YYYY'));
        expect(formatDate(date4)).toEqual(date4);
        expect(formatDate(date5)).toEqual(date5);
    });
    it('should return formatted date-time string', () => {
        const dateTime1 = (new Date()).toISOString();
        const dateTime2 = undefined;
        const dateTime3 = new Date();
        const dateTime4 = {};
        const dateTime5 = '01/01/2019 19:37:21';
        expect(formatDateTime(dateTime1)).toEqual(moment(dateTime1).format('DD/MM/YYYY HH:mm:ss'));
        expect(formatDateTime(dateTime2)).toEqual('');
        expect(formatDateTime(dateTime3)).toEqual(moment(dateTime3.toISOString()).format('DD/MM/YYYY HH:mm:ss'));
        expect(formatDateTime(dateTime4)).toEqual(dateTime4);
        expect(formatDateTime(dateTime5)).toEqual(dateTime5);
    });
});
