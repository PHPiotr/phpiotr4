import expect from 'expect';
import moment from 'moment';
import formatDate from '../../utils/formatDateUtil';

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
});
