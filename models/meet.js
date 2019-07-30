var mongoose = require('mongoose');

var MeetSchema = new mongoose.Schema({
    start: {
        type: String,
    },
    end: {
        type: String
    },
    booked: String
});
module.exports = mongoose.model('Meet', MeetSchema);
