var mongoose = require('mongoose');
var request = require('request');
var emailRegexp = /.+\@.+\..+/;
var TIMESPAN_YEAR = 31536000000;
var TIMESPAN_18_YEARS = 18 * TIMESPAN_YEAR;

function validate_18_years_old_or_more(date) {
    return (Date.now() - date.getTime()) > TIMESPAN_18_YEARS;
}

function twitterHandleExists(handle, done) {
    request('http://twitter.com/' + encodeURIComponent(handle), function(err, res) {
        if (err) {
            console.error(err);
            return done(false);
        }
        if (res.statusCode > 299) {
            done(false);
        } else {
            done(true);
        }
    });
}

function filterTwitterHandle(handle) {
    if (!handle) {
        return;
    }
    handle = handle.trim();
    if (handle.indexOf('@') === 0) {
        handle = handle.substring(1);
    }
    return handle;
}

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    name: String,
    password: String,
    email: {
        type: String,
        required: true,
        match: emailRegexp
    },
    gender: {
        type: String,
        required: true,
        uppercase: true,
        'enum': ['M', 'F']
    },
    birthday: {
        type: Date,
        validate: [validate_18_years_old_or_more, 'ou must be 18 years old or more']
    },
    twitter: {
        type: String,
        validate: [twitterHandleExists, 'Please provide a valid twitter handle'],
        get: filterTwitterHandle,
        set: filterTwitterHandle
    }
});
module.exports = UserSchema;