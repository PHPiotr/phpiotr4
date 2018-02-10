import expect from 'expect';
import formatPrice from '../../utils/formatPriceUtil';

describe('Utils - format price', () => {
    it('should format price as float with two fixed decimals', () => {
        const expectations = {
            2.25: '2.25',
            9: '9.00',
            0: '0.00',
            NaN: 'NaN',
            Infinity: 'Infinity',
            null: 'NaN',
            undefined: 'NaN',
            Array: 'NaN',
            Math: 'NaN',
        };
        for (let key in expectations) {
            if (expectations.hasOwnProperty(key)) {
                expect(formatPrice(key)).toEqual(expectations[key]);
            }
        }
    });
});
