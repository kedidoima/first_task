const mongoose = require('mongoose');

const titleContentSchema = new mongoose.Schema({
    id : String,
    title : {type : String},
    content : {type : String}
});

const TitleContent = mongoose.model('TitleContent',titleContentSchema,'title-content');

module.exports = TitleContent;

