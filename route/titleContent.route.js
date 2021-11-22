const express = require('express');
const router = express.Router();

const titleContentController = require('../controller/titleContentController');


router.get('',titleContentController.getTitleContent);
router.get('/createTC',titleContentController.getCreateTC);
router.get('/editTC',titleContentController.getEditTC)

router.post('/createTC',titleContentController.postCreateTC);
router.post('/editTC',titleContentController.postEditTC);

module.exports = router;