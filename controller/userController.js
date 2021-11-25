const md5 = require('md5');

const User = require('../model/user.model');

const getUsers = async(req,res,next) => {
    const users = await User.find();
    res.render('userList',{
        users : users
    })
}

const getUserView = async(req,res,next) => {
    const user = await User.find({id : req.params.id});
    res.render('userView',{
        user : user[0]
    })
}

const getEditUser = async(req,res,next) => {
    const user = await User.find({id : req.params.id});
    res.render('editUser',{
        id : req.params.id
    })
}

const postEditUser = async(req,res,next) => {
    const user = await User.updateOne({id : req.params.id},{
        name : req.body.newName,
        email : req.body.newEmail,
        password : md5(req.body.newPassword)
    });
    res.redirect('/user/userView/'+req.params.id);
}

module.exports = {
    getUsers,
    getUserView,
    getEditUser,
    postEditUser
}