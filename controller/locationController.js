const Location = require('../model/location.model');

const getLocation = async(req,res,next) => {
    const locs = await Location.find();
    res.render('locView',{
        locs : locs
    });
}

const getCreateLoc = async(req,res,next) => {
    res.render('createLoc');
}

const postCreateLoc = async(req,res,next) => {
    let number = await Location.countDocuments();
    let location = new Location({
        id : number +1 ,
        name : req.body.Name,
        des : req.body.Des,
        img : req.file.path.split('\\').slice(1).join('/')
    })

    location = await location.save();
    res.redirect('/locs');
}

const getEditLoc = async(req,res,next) => {
    res.render('editLoc');
}

const postEditLoc =async(req,res,next) => {
    const check = await Location.updateOne({ id : req.body.id},
        { $set:{
            name : req.body.newName,
            des : req.body.newDes,
            img : req.file.path.split('\\').slice(1).join('/')
        }});
    res.redirect('/locs');
}

module.exports = {
    getLocation,
    getCreateLoc,
    postCreateLoc,
    getEditLoc,
    postEditLoc
}