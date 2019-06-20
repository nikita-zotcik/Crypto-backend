const express = require("express");
const coin = require("../controllers/coin");
const exchanges = require("../controllers/exchanges");
const router = express.Router();

//localhost:5000/api/getCoins
router.get("/getCoins", coin.getCoins);

//localhost:5000/api/getCoinsFullInfo
router.get("/getCoinsFullInfo", coin.getCoinsFullInfo);

//localhost:5000/api/getCoinsFromDb
router.get("/getCoinsFromDb", coin.getCoinsFromDb);

//localhost:5000/api/updateCoinsInfoSupply
router.get("/updateCoinsInfoSupply", coin.updateCoinsInfoSupply);

//localhost:5000/api/updateInfoExchangesCoins
router.get("/updateInfoExchangesCoins", coin.updateInfoExchangesCoins);

//localhost:5000/api/updateVolumeExchanges
router.get("/updateVolumeExchanges", exchanges.updateVolumeExchanges);

//localhost:5000/api/updateInfoExchanges
router.get("/updateInfoExchanges", exchanges.updateInfoExchanges);

//localhost:5000/api/getExchangesFromDb
router.get("/getExchangesFromDb", exchanges.getExchangesFromDb);

module.exports = router;
