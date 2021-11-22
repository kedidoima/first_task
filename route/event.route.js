const express = require('express');
const Multer = require('multer');
const router = express.Router();

const eventController = require('../controller/eventController');

const upload = Multer({dest:'./public/images/'});

router.get('',eventController.getEvent);
router.get('/createEvent',eventController.getCreateEvent);
router.post('/createEvent',upload.single('newImage'),eventController.postCreateEvent);
router.get('/editEvent/',eventController.getEditEvent);
router.post('/editEvent',upload.single('newImage'),eventController.postEditEvent);
module.exports = router;