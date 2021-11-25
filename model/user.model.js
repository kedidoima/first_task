const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    email : String,
    password : String,
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    }
})

const User = new mongoose.model('User',userSchema);
module.exports = User;