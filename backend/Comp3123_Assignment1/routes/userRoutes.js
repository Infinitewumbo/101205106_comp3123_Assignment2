const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup } = require('../middleware/userValidation'); 

router.post('/signup', validateSignup, userController.signup);
router.post('/login', userController.login); // Add validation here later

module.exports = router;