const express = require('express');
const Multer  = require('multer');
const router = express.Router();

const locController = require('../controller/locationController');

const upload = Multer({dest:'public/locImg/'});

router.get('',locController.getLocation);
router.get('/createLoc',locController.getCreateLoc);
router.get('/editLoc',locController.getEditLoc);

router.post('/createLoc',upload.single('Image'),locController.postCreateLoc);
router.post('/editLoc',upload.single('newImage'),locController.postEditLoc);

module.exports = router;