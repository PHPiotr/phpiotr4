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
        type: String,
        required: true
    },
    arrival_time: {
        type: String,
        required: true
    },
    seat: {
        type: String
    },
    is_return: {
        type: Boolean,
        default: false
    },
    return_departure_date: {
        type: Date
    },
    return_departure_time: {
        type: String
    },
    return_arrival_time: {
        type: String
    },
    return_seat: {
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
        'enum': ['£', 'zł', '€', '$'],
        default: '£'
    },
    checked_in: {
        type: Boolean,
        default: false
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
        .virtual('going_out')
        .get(function() {
            var day = parseInt(this.departure_date.getDate(), 10) < 10 ? '0' + this.departure_date.getDate() : this.departure_date.getDate();
            var month = parseInt(this.departure_date.getMonth(), 10) < 9 ? '0' + (parseInt(this.departure_date.getMonth(), 10) + 1) : (parseInt(this.departure_date.getMonth(), 10) + 1);
            var year = this.departure_date.getFullYear();
            var departure_time = this.departure_time;
            var departure_hour = departure_time.substring(0, 2);
            var departure_min = departure_time.substring(2);
            var arrival_time = this.arrival_time;
            var arrival_hour = arrival_time.substring(0, 2);
            var arrival_min = arrival_time.substring(2);
            var seat = this.seat;
            return day + '/' + month + '/' + year + ' (' + departure_hour + ':' + departure_min + ' - ' + arrival_hour + ':' + arrival_min + ')' + ' ' + seat;
        });
FlightSchema
        .virtual('coming_back')
        .get(function() {
            if (!this.return_departure_date) {
                return null;
            }

            var day = parseInt(this.return_departure_date.getDate(), 10) < 10 ? '0' + this.return_departure_date.getDate() : this.return_departure_date.getDate();
            var month = parseInt(this.return_departure_date.getMonth(), 10) < 9 ? '0' + (parseInt(this.return_departure_date.getMonth(), 10) + 1) : (parseInt(this.return_departure_date.getMonth(), 10) + 1);
            var year = this.return_departure_date.getFullYear();
            var return_departure_time = this.return_departure_time;
            var return_departure_hour = return_departure_time.substring(0, 2);
            var return_departure_min = return_departure_time.substring(2);
            var return_arrival_time = this.return_arrival_time;
            var return_arrival_hour = return_arrival_time.substring(0, 2);
            var return_arrival_min = return_arrival_time.substring(2);
            var return_seat = this.return_seat;
            return day + '/' + month + '/' + year + ' (' + return_departure_hour + ':' + return_departure_min + ' - ' + return_arrival_hour + ':' + return_arrival_min + ')' + ' ' + return_seat;
        });

FlightSchema.statics.search = function(str, callback) {
    var regexp = new RegExp(str, 'i');
    return this.find({'$or': [{title: regexp}, {body: regexp}]}, callback);
};

module.exports = FlightSchema;