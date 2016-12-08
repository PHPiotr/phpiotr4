/*
 * Ticket Routes
 */
var async = require('async');
var Flight = require('../data/models/flight');
var notLoggedIn = require('./middleware/not_logged_in');
var loadFlight = require('./middleware/load_flight');
var loggedIn = require('./middleware/logged_in');
var maxPerPage = 10;

var express = require('express');
var router = express.Router();

router.get('/', loggedIn, function(req, res, next) {
    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    async.parallel(
            [
                function(next) {
                    Flight.count(next);
                },
                function(next) {
                    Flight.find({})
                            .sort('depature_date')
                            .skip(page * maxPerPage)
                            .limit(maxPerPage)
                            .exec(next);
                },
                function(next) {
                    Flight.aggregate(
                            [
                                {
                                    "$group": {
                                        "_id": "$created_by",
                                        "cost": {"$sum": "$price"}
                                    }
                                }
                            ],
                            function(err, results) {
                                next(err, results);
                            }
                    );
                }
            ],
            function(err, results) {
                if (err) {
                    return next(err);
                }
                var count = results[0];
                var flights = results[1];
                var total_costs = results[2];
                var total_costs_length = total_costs.length;
                var user_id = req.session.user._id;
                var user_cost = null;
                for (var i = 0; i < total_costs_length; i++) {
                    if ((total_costs[i]._id).toString() !== user_id) {
                        continue
                    }
                    user_cost = (total_costs[i].cost / 100).toFixed(2);
                    break;
                }
                var lastPage = (page + 1) * maxPerPage >= count;
                res.render('flights/index', {
                    title: 'Flights',
                    flights: flights,
                    page: page,
                    lastPage: lastPage,
                    user_cost: user_cost
                });
            }
    );
});
router.get('/new', loggedIn, function(req, res) {
    res.render('flights/new', {
        title: "New flight",
        currencies: Flight.schema.path('currency').enumValues
    });
});

router.get('/search', function(req, res, next) {
    console.log('searching for', req.query.q);
    Flight.search(req.query.q, function(err, flights) {
        if (err) {
            return next(err);
        }
        res.render('flights/index', {
            title: 'Flights search results',
            flights: flights,
            page: 0,
            lastPage: true
        });
    });
});

router.get('/:confirmation_code', loadFlight, function(req, res, next) {
    res.render('flights/flight', {title: req.flight.confirmation_code,
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
        res.redirect('/flights');
    });
});
router.delete('/:confirmation_code', loggedIn, loadFlight, function(req, res, next) {
    req.event.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/flights');
    });
});

module.exports = router;