/*
 * Ticket Routes
 */
var async = require('async');
var Train = require('../../data/models/train');
var notLoggedIn = require('../middleware/not_logged_in');
var loadTrain = require('../middleware/load_train');
var loggedIn = require('../middleware/logged_in');
var maxPerPage = 10;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', loggedIn, function(req, res, next) {

    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    var user_id = req.session.user._id;
    var param_type = req.query.type || '';
    var sort_type = {$gte: new Date()};
    var type = 'Current';
    var type_lower = param_type.toLowerCase();
    if ('past' === type_lower) {
        sort_type = {$lt: new Date()};
        type = 'Past';
    }

    async.parallel(
            [
                function(next) {
                    Train.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort('departure_date')
                            .skip(page * maxPerPage)
                            .limit(maxPerPage)
                            .exec(next);
                },
                function(next) {
                    Train.aggregate(
                            [
                                {
                                    $match: {
                                        created_by: mongoose.Types.ObjectId(user_id),
                                        departure_date: sort_type
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$created_by",
                                        cost: {$sum: "$price"}
                                    }
                                }
                            ],
                            function(err, results) {
                                if (err) {
                                    return next(err);
                                }
                                if (!results) {
                                    return next();
                                }

                                if (undefined === results[0]) {
                                    return next(err);
                                }

                                next(err, results[0].cost);
                            }
                    );
                }
            ],
            function(err, results) {
                if (err) {
                    return next(err);
                }
                var trains = results[0];
                var cost = results[1];
                var trains_length = trains.length;
                var last_page = (page + 1) * maxPerPage >= trains_length;

                var return_trains_length = 0;
                for (var key in trains) {
                    return_trains_length += trains[key].is_return ? 1 : 0;
                }

                res.render('trains/index', {
                    title: type + ' trains',
                    trains: trains,
                    page: page,
                    last_page: last_page,
                    total_cost: trains_length ? (cost / 100).toFixed(2) : '0.00',
                    average_cost: trains_length ? ((cost / (trains_length + return_trains_length)) / 100).toFixed(2) : '0.00',
                    trains_length: trains_length,
                    return_trains_length: return_trains_length,
                    active: type_lower,
                    selected: 'trains'
                });
            }
    );
});
router.get('/new', loggedIn, function(req, res) {
    res.render('trains/new', {
        title: "New train",
        currencies: Train.schema.path('currency').enumValues,
        selected: 'trains'
    });
});

router.get('/search', function(req, res, next) {
    console.log('searching for', req.query.q);
    Train.search(req.query.q, function(err, trains) {
        if (err) {
            return next(err);
        }
        res.render('trains/index', {
            title: 'Trains search results',
            trains: trains,
            page: 0,
            lastPage: true
        });
    });
});

router.get('/:booking_number', loadTrain, function(req, res, next) {
    res.render('trains/train', {title: req.train.confirmation_code,
        train: req.train});
});
router.post('/', loggedIn, function(req, res, next) {
    var train = req.body;
    train.created_by = req.session.user._id;
    Train.create(train, function(err) {
        if (err) {
            if (err.code === 11000) {
                console.log(err, train);
                res.status(409).send('Conflict');
            } else {
                if (err.name === 'ValidationError') {
                    return res.status(406).send(Object.keys(err.errors).map(function(errField) {
                        return err.errors[errField].message;
                    }).join('. '));
                } else {
                    next(err);
                }
            }
            return;
        }
        res.redirect('/bookings/trains');
    });
});
router.delete('/:booking_number', loggedIn, loadTrain, function(req, res, next) {
    req.event.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/bookings/trains');
    });
});

module.exports = router;