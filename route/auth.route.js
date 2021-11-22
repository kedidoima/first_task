const express = require('express');

const router = express.Router();
const authController = require('../controller/authController');

router.get('/login',authController.login);
router.post('/login',authController.postLogin);
router.get('/logout',authController.logout);

module.exports = router;