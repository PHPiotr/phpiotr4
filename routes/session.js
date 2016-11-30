var User = require('../data/models/user');
var loggedIn = require('./middleware/logged_in');
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

        if (!user) {
            req.flash('error_message', 'User does not exist.');
            return res.redirect('/session/new');
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                req.flash('error_message', 'Password does not match.');
                return res.redirect('/session/new');
            }

            req.flash('success_message', 'Hello, ' + user.username + '!');
            req.session.user = user;
            res.redirect('/users');
        });
    });
});
router.delete('/', function(req, res, next) {
    req.session.destroy();
    res.redirect('/users');
});

module.exports = router;