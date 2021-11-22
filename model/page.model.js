const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    name : {type : String},
    
    title : String,
    content : String
});

const Page = mongoose.model('Page',pageSchema,'page');

module.exports = Page;