export default (number) => {
    if (number === 0) {
        return '0.00';
    }
    if (number.toString().match(/\.+/)) {
        return typeof number.toFixed === 'function' ? number.toFixed(2) : number;
    }
    return (number).toFixed(2);
};

