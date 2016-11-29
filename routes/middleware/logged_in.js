function loggedIn(req, res, next) {
    if (!req.session.user) {
        res.status(403).send('Forbidden. Please log in first.');
    } else {
        next();
    }
}
module.exports = loggedIn;