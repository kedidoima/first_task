const Event = require('../model/event.model');

const getEvent = async(req,res,next) => {
    const events = await Event.find();
    res.render('eventView',{
        events : events
    });
}

const getCreateEvent = async(req,res,next) => {
    res.render('createEvent');
}

const postCreateEvent = async (req,res,next) =>{
    let number = await Event.countDocuments();
    let event = new Event({
        id : number+1,
        name : req.body.newName,
        date : Date.now(),
        img : req.file.path.split('\\').slice(1).join('/')
    })

    event = await event.save();
    res.redirect('/event');
}

const getEditEvent = async(req,res,next) =>{
    res.render('editEvent');
}

const postEditEvent = async(req,res,next) =>{
    const check = await Event.updateOne({ id : req.body.id}, 
        { $set: { 
            name : req.body.newName,
            date : Date.now(),
            img : req.file.path.split('\\').slice(1).join('/')
        }}) ;
    res.redirect('/event');
}

module.exports = {
    getEvent,
    getCreateEvent,
    getEditEvent,
    postCreateEvent,
    postEditEvent
}