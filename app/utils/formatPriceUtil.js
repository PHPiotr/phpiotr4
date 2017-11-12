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

export default formatPrice;