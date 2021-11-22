const TitleContent = require('../model/title-content.model');

const renderPage = async (req, res,next) => {
    let pages = await TitleContent.find({id:"1"});
    res.render('page',{
        title : pages[0].title,
        content : pages[0].content,
    });
}

module.exports = {
    renderPage
}