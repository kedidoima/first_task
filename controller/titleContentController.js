const TitleContent = require('../model/title-content.model');

const getTitleContent = async(req,res,next) => {
    const tCs = await TitleContent.find();
    res.render('titleContentView',{
        tCs : tCs
    })
}

const getCreateTC = async(req,res,next) => {
    res.render('createTC');
}

const postCreateTC = async (req,res,next) =>{
    let number = await TitleContent.countDocuments();
    let tC = new TitleContent({
        id : number+1,
        title : req.body.newTitle,
        content : req.body.newContent
    })

    tC = await tC.save();
    res.redirect('/tCs');
}

const getEditTC = async(req,res,next) =>{
    res.render('editTC');
}

const postEditTC = async (req,res,next) => {
    
    const check = await TitleContent.updateOne({ id : req.body.id}, 
        { $set: { 
            title : req.body.newTitle,
            content : req.body.newContent,
        }});

    res.redirect('/tCs');
}

module.exports = {
    getTitleContent,
    getCreateTC,
    postCreateTC,
    getEditTC,
    postEditTC
}