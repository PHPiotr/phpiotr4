/*
 * Ticket Routes
 */
var async = require('async');
var Flight = require('../../data/models/flight');
var notLoggedIn = require('../middleware/not_logged_in');
var loadFlight = require('../middleware/load_flight');
var loggedIn = require('../middleware/logged_in');
var maxPerPage = 10;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', loggedIn, function(req, res, next) {

    var current_page = req.query.page && parseInt(req.query.page, 10) || 1;
    var user_id = req.session.user._id;
    var param_type = req.query.type || '';
    var sort_type = {$gte: new Date()};
    var sort = {'departure_date': 1};
    var type = 'Current';
    var type_lower = param_type.toLowerCase() || type.toLowerCase();
    if ('past' === type_lower) {
        sort_type = {$lt: new Date()};
        sort = {'departure_date': -1};
        type = 'Past';
    }
    req.active = 'planes';

    async.parallel(
            [
                function(next) {
                    Flight.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort(sort)
                            .skip((current_page - 1) * maxPerPage)
                            .limit(maxPerPage)
                            .exec(next);
                },
                function(next) {
                    Flight.aggregate(
                            [
                                {
                                    $match: {
                                        created_by: mongoose.Types.ObjectId(user_id),
                                        departure_date: sort_type
                                    }
                                },
                                {
                                    $project: {
                                        is_return_flight: {
                                            $cond: ["$is_return", 1, 0]
                                        },
                                        price: 1
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$created_by",
                                        cost: {$sum: "$price"},
                                        flights_length: {$sum: 1},
                                        return_flights_length: {$sum: "$is_return_flight"}
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
                                next(err, results[0]);
                            }
                    );
                }
            ],
            function(err, results) {
                if (err) {
                    return next(err);
                }
                var flights = results[0];
                var cost = results[1].cost;
                var flights_length = results[1].flights_length;
                var return_flights_length = results[1].return_flights_length;

                res.render('planes/index', {
                    title: type + ' flights',
                    flights: flights,
                    current_page: current_page,
                    is_first_page: current_page === 1,
                    is_last_page: current_page * maxPerPage >= flights_length,
                    total_cost: flights_length ? (cost / 100).toFixed(2) : '0.00',
                    average_cost: flights_length ? ((cost / (flights_length + return_flights_length)) / 100).toFixed(2) : '0.00',
                    flights_length: flights_length,
                    return_flights_length: return_flights_length,
                    active: type_lower,
                    selected: 'planes'
                });
            }
    );
});
router.get('/new', loggedIn, function(req, res) {
    res.render('planes/new', {
        title: "New flight",
        currencies: Flight.schema.path('currency').enumValues,
        selected: 'planes'
    });
});

router.get('/search', function(req, res, next) {
    console.log('searching for', req.query.q);
    Flight.search(req.query.q, function(err, flights) {
        if (err) {
            return next(err);
        }
        res.render('planes/index', {
            title: 'Flights search results',
            flights: flights,
            page: 0,
            lastPage: true
        });
    });
});

router.get('/:confirmation_code', loadFlight, function(req, res, next) {
    res.render('planes/flight', {title: req.flight.confirmation_code,
        flight: req.flight});
});
router.post('/', loggedIn, function(req, res, next) {
    var flight = req.body;
    flight.created_by = req.session.user._id;
    Flight.create(flight, function(err) {
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
        res.redirect('/bookings/planes');
    });
});
router.delete('/:confirmation_code', loggedIn, loadFlight, function(req, res, next) {
    req.event.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/bookings/planes');
    });
});

module.exports = router;