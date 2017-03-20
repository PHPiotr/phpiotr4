var config = require('../../config');
var jwt = require('jsonwebtoken');
var User = require('../../data/models/user');

function loggedIn(req, res, next) {

    var token = req.headers['authorization'];

    if (token) {

        token = token.replace('Bearer ', '');

        return jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    err: err,
                });
            }
            req.decoded = decoded;
            User.findOne({_id: decoded.sub}, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(404).send('User not found');
                }
                req.user = user;
                return next();
            });
        });

    }

    res.status(403).json({
        success: false,
        message: 'No token provided.'
    });

}

module.exports = loggedIn;