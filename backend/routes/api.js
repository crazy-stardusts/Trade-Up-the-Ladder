const express = require("express")
const router = express.Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes")

router.use("/user", userRoutes);
router.use("/game", gameRoutes);


module.exports = router;