var Schema = require('mongoose').Schema;

var FlightSchema = new Schema({
    confirmation_code: {
        type: String,
        unique: true,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    departure_time: {
        type: String
    },
    arrival_time: {
        type: String
    },
    price: {
        type: Number,
        get: function(number) {
            return (number / 100).toFixed(2);
        },
        required: true
    },
    currency: {
        type: String,
        'enum': ['zł', '£', '€', '$'],
        required: true
    },
    checked_in: {
        type: Boolean
    },
    created_by: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    meta: {
        created_at: {
            type: Date,
            'default': Date.now,
            set: function(val) {
                return undefined;
            }
        },
        updated_at: {
            type: Date,
            'default': Date.now
        }
    }
});

FlightSchema
        .virtual('formatted_departure_date')
        .get(function() {
            return this.departure_date.getDate() + '/' + (parseInt(this.departure_date.getMonth(), 10) + 1) + '/' + this.departure_date.getFullYear()
        });
FlightSchema
        .virtual('formatted_departure_time')
        .get(function() {
            var departure_time = this.departure_time;
            return departure_time.substring(0, 2) + ':' + departure_time.substring(2);
        });

FlightSchema.statics.search = function(str, callback) {
    var regexp = new RegExp(str, 'i');
    return this.find({'$or': [{title: regexp}, {body: regexp}]}, callback);
};

module.exports = FlightSchema;