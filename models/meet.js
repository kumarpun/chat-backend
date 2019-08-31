var mongoose = require('mongoose');

var MeetSchema = new mongoose.Schema({
    start: {
        type: String,
    },
    end: {
        type: String
    },
    booked: String,
    patientID: {
        type: String
    },
    doctorID: {
        type : String
    },
    generatedsessionID: {
        type: String
    }
});
module.exports = mongoose.model('Meet', MeetSchema);
