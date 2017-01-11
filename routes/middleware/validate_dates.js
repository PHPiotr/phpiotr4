function getFormattedValue(date) {

    if (!date) {
        return null;
    }

    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var match = pattern.exec(date);

    if (undefined === match[1]) {
        return null;
    }

    return match[2] + '/' + match[1] + '/' + match[3];
}

function validateDates(req, res, next) {

    req.query.from = getFormattedValue(req.query.from);
    req.query.to = getFormattedValue(req.query.to);

    next();
}
module.exports = validateDates;
