var Schema = require('mongoose').Schema;
var JourneyTypeSchema = new Schema({
    'journey_type': {
        type: String,
        required: true
    }
});
module.exports = JourneyTypeSchema;
