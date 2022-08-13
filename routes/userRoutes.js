const { signup } = require('../controllers/authController');

const router = require('express').Router();

router.post('/signup', signup);

module.exports = router;