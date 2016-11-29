function notLoggedIn(req, res, next) {

    if (undefined === req.session) {
        next();
    } else {
        if (undefined === req.session.user) {
            next();
        } else {
            if (req.session.user) {
                res.status(401).send('Unauthorized');
            } else {
                next();
            }
        }
    }
}
module.exports = notLoggedIn;