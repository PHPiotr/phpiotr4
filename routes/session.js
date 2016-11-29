var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');

var express = require('express');
var router = express.Router();

router.get('/new', notLoggedIn, function(req, res) {
    res.render('session/new', {title: "Log in"});
});
router.post('/', notLoggedIn, function(req, res) {
    User.findOne({username: req.body.username},

    function(err, user) {
        if (err) {
            return next(err);
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                res.redirect('/session/new');
            }
            if (user) {
                req.session.user = user;
                res.redirect('/users');
            } else {
                res.redirect('/session/new');
            }
        });

    });
});
router.delete('/', function(req, res, next) {
    req.session.destroy();
    res.redirect('/users');
});

module.exports = router;