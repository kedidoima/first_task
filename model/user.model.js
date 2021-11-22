const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    email : String,
    password : String
})

const User = new mongoose.model('User',userSchema);
module.exports = User;