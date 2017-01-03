var async = require('async');
var mongoose = require('mongoose');
var loggedIn = require('./middleware/logged_in');

var Bus = require('../data/models/bus');
var Plane = require('../data/models/flight');
var Train = require('../data/models/train');
var Hostel = require('../data/models/hostel');

var express = require('express');
var router = express.Router();

router.get('/', loggedIn, function(req, res, next) {

    var from = req.query.from || null;
    var to = req.query.to || null;

    var user_id = req.session.user._id;
    var sort_type;
    if (from && to) {
        sort_type = {$gte: new Date(from), $lte: new Date(to)};
    } else {
        if (from) {
            sort_type = {$gte: new Date(from)};

        } else {
            sort_type = {$lte: new Date(to)};

        }
    }

    async.parallel(
            [
                function(next) {
                    Bus.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort('departure_date')
                            .exec(next);
                },
                function(next) {
                    Plane.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort('departure_date')
                            .exec(next);
                },
                function(next) {
                    Train.find({created_by: mongoose.Types.ObjectId(user_id), departure_date: sort_type})
                            .sort('departure_date')
                            .exec(next);
                },
                function(next) {
                    Hostel.find({created_by: mongoose.Types.ObjectId(user_id), checkin_date: sort_type})
                            .sort('checkin_date')
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
                                var cost;
                                if (err) {
                                    return next(err);
                                }
                                if (!results) {
                                    return next();
                                }
                                cost = undefined !== results[0] ? results[0].cost : 0;
                                next(err, cost);
                            }
                    );
                },
                function(next) {
                    Plane.aggregate(
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
                                var cost;
                                if (err) {
                                    return next(err);
                                }
                                if (!results) {
                                    return next();
                                }
                                cost = undefined !== results[0] ? results[0].cost : 0;
                                next(err, cost);
                            }
                    );
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
                                var cost;
                                if (err) {
                                    return next(err);
                                }
                                if (!results) {
                                    return next();
                                }
                                cost = undefined !== results[0] ? results[0].cost : 0;
                                next(err, cost);
                            }
                    );
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
                                cost = undefined !== results[0] ? results[0].cost : 0;
                                next(err, cost);
                            }
                    );
                }
            ],
            function(error, data) {
                var buses        = data[0];
                var planes       = data[1];
                var trains       = data[2];
                var hostels      = data[3];
                var buses_cost   = data[4];
                var planes_cost  = data[5];
                var trains_cost  = data[6];
                var hostels_cost = data[7];
                res.send(JSON.stringify(
                    {
                        buses:        buses,
                        planes:       planes,
                        trains:       trains,
                        hostels:      hostels,
                        buses_cost:   (buses_cost / 100).toFixed(2),
                        planes_cost:  (planes_cost / 100).toFixed(2),
                        trains_cost:  (trains_cost / 100).toFixed(2),
                        hostels_cost: (hostels_cost / 100).toFixed(2),
                        total_cost:   ((buses_cost + planes_cost + trains_cost + hostels_cost) / 100).toFixed(2)
                    }
                ));
            }
    );
});

module.exports = router;