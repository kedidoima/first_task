const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    id : String,
    name : String,
    des : String,
    img : String
});

const Location = new mongoose.model('Location',locationSchema);
module.exports = Location;