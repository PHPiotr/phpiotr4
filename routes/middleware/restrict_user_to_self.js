function restrictUserToSelf(req, res, next) {
    if (!req.session.user || req.session.user.username !== req.user.username) {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}
module.exports = restrictUserToSelf;