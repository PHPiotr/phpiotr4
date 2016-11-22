function notLoggedIn(req, res, next) {

    if (undefined === req.session) {
        next();
    } else {
        if (undefined === req.session.user) {
            next();
        } else {
            if (req.session.user) {
                res.send('Unauthorized', 401);
            } else {
                next();
            }
        }
    }
}
module.exports = notLoggedIn;