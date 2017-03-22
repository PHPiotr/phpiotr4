var async = require('async');
var User = require('../data/models/user');
var config = require('../config');
var loggedIn = require('./middleware/logged_in');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');
var maxUsersPerPage = 10;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var page = req.query.page && parseInt(req.query.page, 10) || 1;

    async.parallel(
            [
                function(next) {
                    User.count(next);
                },
                function(next) {
                    User.find({})
                            .sort('name')
                            .skip(page * maxUsersPerPage)
                            .limit(maxUsersPerPage)
                            .exec(next);
                }
            ],
            function(err, results) {
                if (err) {
                    return next(err);
                }
                var count = results[0];
                var users = results[1];
                var lastPage = page * maxUsersPerPage >= count;
                res.json({
                    title: 'Users',
                    users: users,
                    page: page,
                    lastPage: lastPage
                });
            }
    );
});
router.get('/new', notLoggedIn,
        function(req, res) {
            res.render('users/new', {title: "New User"});
        });
router.get('/:name', loggedIn, loadUser, function(req, res, next) {
    req.user.recentArticles(function(err, articles) {
        if (err) {
            return next(err);
        }
        res.render('users/profile', {
            title: 'User profile',
            user: req.user,
            recentArticles: articles
        });
    });
});
router.post('/', notLoggedIn,
        function(req, res, next) {
            User.findOne({username: req.body.username}, function(err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    return res.send('Conflict', 409);
                }
                User.create(req.body, function(err) {
                    if (err) {
                        if (err.code === 11000) {
                            res.send('Conflict', 409);
                        } else {
                            if (err.name === 'ValidationError') {
                                return res.send(Object.keys(err.errors).map(function(errField) {
                                    return err.errors[errField].message;
                                }).join('. '), 406);
                            } else {
                                next(err);
                            }
                        }
                        return;
                    }
                    res.redirect('/users');
                });
            });
        });

router.delete('/:name', loadUser, restrictUserToSelf,
        function(req, res, next) {
            req.user.remove(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/users');
            });
        });

module.exports = router;