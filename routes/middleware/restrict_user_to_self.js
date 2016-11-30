function restrictUserToSelf(req, res, next) {

    if (req.session.user && req.session.user.username === req.user.username) {
        return next();
    }

    res.status(401).send('Unauthorized');
}
module.exports = restrictUserToSelf;