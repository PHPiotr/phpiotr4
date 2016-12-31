var Schema = require('mongoose').Schema;

var HostelSchema = new Schema({
    booking_number: {
        type: Number,
        unique: true,
        required: true
    },
    hostel_name: {
        type: String,
        required: true
    },
    hostel_address: {
        type: String
    },
    checkin_date: {
        type: Date,
        required: true
    },
    checkout_date: {
        type: Date,
        required: true
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

HostelSchema.virtual('checkin').get(function() {
    var date = this.checkin_date;
    var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
    var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
});
HostelSchema.virtual('checkout').get(function() {
    var date = this.checkout_date;
    var day = parseInt(date.getDate(), 10) < 10 ? '0' + date.getDate() : date.getDate();
    var month = parseInt(date.getMonth(), 10) < 9 ? '0' + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1);
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
});

module.exports = HostelSchema;