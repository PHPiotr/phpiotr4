function notLoggedIn(req, res, next) {

    if (undefined === req.session) {
        return next();
    }

    if (undefined === req.session.user) {
        return next();
    }

    if (!req.session.user) {
        return next();
    }

    res.status(401).send('Unauthorized');
}
module.exports = notLoggedIn;