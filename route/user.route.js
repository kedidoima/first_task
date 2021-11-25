const express = require('express');
const Multer = require('multer');
const router = express.Router();

const userController = require('../controller/userController');

router.get('',userController.getUsers);
router.get('/userView/:id',userController.getUserView);
router.get('/editUser/:id',userController.getEditUser);

router.post('/editUser/:id',userController.postEditUser);


module.exports = router;