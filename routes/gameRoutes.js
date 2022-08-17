const { protect } = require('../controllers/authController');
const { createGame, getAllGames } = require('../controllers/gameController');

const router = require('express').Router();

router.route("")
.post(protect, createGame)
.get(protect, getAllGames)

module.exports = router;