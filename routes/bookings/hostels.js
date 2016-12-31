/*
 * Ticket Routes
 */
var async = require('async');
var Hostel = require('../../data/models/hostel');
var notLoggedIn = require('../middleware/not_logged_in');
var loadHostel = require('../middleware/load_hostel');
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
                    Hostel.find({created_by: mongoose.Types.ObjectId(user_id), checkin_date: sort_type})
                            .sort('departure_date')
                            .skip(page * maxPerPage)
                            .limit(maxPerPage)
                            .exec(next);
                },
                function(next) {
                    Hostel.aggregate(
                            [
                                {
                                    $match: {
                                        created_by: mongoose.Types.ObjectId(user_id),
                                        checkin_date: sort_type
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
                                var cost;
                                if (err) {
                                    return next(err);
                                }
                                if (!results) {
                                    return next();
                                }
                                cost = undefined !== results[0] ? results[0].cost : '0';
                                next(err, cost);
                            }
                    );
                }
            ],
            function(err, results) {
                if (err) {
                    return next(err);
                }
                var bookings = results[0];
                var cost = results[1];
                var bookings_length = bookings.length;
                var last_page = (page + 1) * maxPerPage >= bookings_length;

                res.render('hostels/index', {
                    title: type + ' hostels',
                    bookings: bookings,
                    page: page,
                    last_page: last_page,
                    total_cost: bookings_length ? (cost / 100).toFixed(2) : '0.00',
                    average_cost: bookings_length ? ((cost / (bookings_length)) / 100).toFixed(2) : '0.00',
                    bookings_length: bookings_length,
                    active: type_lower,
                    selected: 'hostels'
                });
            }
    );
});
router.get('/new', loggedIn, function(req, res) {
    res.render('hostels/new', {
        title: "New hostel",
        currencies: Hostel.schema.path('currency').enumValues,
        selected: 'hostels'
    });
});

router.get('/search', function(req, res, next) {
    console.log('searching for', req.query.q);
    Hostel.search(req.query.q, function(err, flights) {
        if (err) {
            return next(err);
        }
        res.render('hostels/index', {
            title: 'Flights search results',
            flights: flights,
            page: 0,
            lastPage: true
        });
    });
});

router.get('/:confirmation_code', loadHostel, function(req, res, next) {
    res.render('hostels/flight', {title: req.flight.confirmation_code,
        flight: req.flight});
});
router.post('/', loggedIn, function(req, res, next) {
    var flight = req.body;
    flight.created_by = req.session.user._id;
    Hostel.create(flight, function(err) {
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
        res.redirect('/bookings/hostels');
    });
});
router.delete('/:confirmation_code', loggedIn, loadHostel, function(req, res, next) {
    req.event.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/bookings/hostels');
    });
});

module.exports = router;