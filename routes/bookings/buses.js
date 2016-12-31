/*
 * Ticket Routes
 */
var async = require('async');
var Bus = require('../../data/models/bus');
var notLoggedIn = require('../middleware/not_logged_in');
var loadBus = require('../middleware/load_bus');
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
                    Bus.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort('departure_date')
                            .skip(page * maxPerPage)
                            .limit(maxPerPage)
                            .exec(next);
                },
                function(next) {
                    Bus.aggregate(
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
                var buses = results[0];
                var cost = results[1];
                var buses_length = buses.length;
                var last_page = (page + 1) * maxPerPage >= buses_length;

                var return_buses_length = 0;
                for (var key in buses) {
                    return_buses_length += buses[key].is_return ? 1 : 0;
                }

                res.render('buses/index', {
                    title: type + ' buses',
                    buses: buses,
                    page: page,
                    last_page: last_page,
                    total_cost: buses_length ? (cost / 100).toFixed(2) : '0.00',
                    average_cost: buses_length ? ((cost / (buses_length + return_buses_length)) / 100).toFixed(2) : '0.00',
                    buses_length: buses_length,
                    return_buses_length: return_buses_length,
                    active: type_lower,
                    selected: 'buses'
                });
            }
    );
});
router.get('/new', loggedIn, function(req, res) {
    res.render('buses/new', {
        title: "New bus",
        currencies: Bus.schema.path('currency').enumValues,
        selected: 'buses'
    });
});

router.get('/search', function(req, res, next) {
    console.log('searching for', req.query.q);
    Bus.search(req.query.q, function(err, buses) {
        if (err) {
            return next(err);
        }
        res.render('buses/index', {
            title: 'Buss search results',
            buses: buses,
            page: 0,
            lastPage: true
        });
    });
});

router.get('/:booking_number', loadBus, function(req, res, next) {
    res.render('buses/bus', {title: req.bus.confirmation_code,
        bus: req.bus});
});
router.post('/', loggedIn, function(req, res, next) {
    var bus = req.body;
    bus.created_by = req.session.user._id;
    Bus.create(bus, function(err) {
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
        res.redirect('/bookings/buses');
    });
});
router.delete('/:booking_number', loggedIn, loadBus, function(req, res, next) {
    req.event.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/bookings/buses');
    });
});

module.exports = router;