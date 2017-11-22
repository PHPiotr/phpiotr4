const formatPrice = (input) => {
    let stringInput = '' + input;
    let dotIndex = stringInput.indexOf('.');
    if (-1 === dotIndex) {
        return stringInput + '.00';
    }
    let afterDot = stringInput.substring(dotIndex + 1);
    let afterDotLength = afterDot.length;
    if (1 === afterDotLength) {
        return stringInput + '0';
    }
    return stringInput;
};
//export default formatPrice;

export default (number) => {
    if (number === 0) {
        return '0.00';
    }
    if (number.toString().match(/\.+/)) {
        return typeof number.toFixed === 'function' ? number.toFixed(2) : number;
    }
    return (number).toFixed(2);
};

