const express = require("express");
const controller = require("../controllers/coin");
const router = express.Router();

//localhost:5000/api/getCoins
router.get("/getCoins", controller.getCoins);

//localhost:5000/api/getCoinsFullInfo
router.get("/getCoinsFullInfo", controller.getCoinsFullInfo);

//localhost:5000/api/getCoinsFromDb
router.get("/getCoinsFromDb", controller.getCoinsFromDb);

//localhost:5000/api/updateCoinsInfoSupply
router.get("/updateCoinsInfoSupply", controller.updateCoinsInfoSupply);

module.exports = router;
