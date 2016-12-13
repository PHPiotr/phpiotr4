function loggedIn(req, res, next) {

    if (req.session.user) {
        return next();
    }

    req.flash('error_message', 'Please log in.');
    res.redirect('/session/new');
}
module.exports = loggedIn;