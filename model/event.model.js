const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id : String,
    name : String,
    date : Date,
    img : String
});

const Event = new mongoose.model('Event',eventSchema);
module.exports = Event;