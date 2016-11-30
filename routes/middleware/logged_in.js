function loggedIn(req, res, next) {

    if (req.session.user) {
        return next();
    }

    res.status(403).send('Forbidden. Please log in first.');
}
module.exports = loggedIn;