const { signup, login, protect, forgotPassword, resetPassword, updatePassword } = require('../controllers/authController');

const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updatePassword', protect, updatePassword);

module.exports = router;