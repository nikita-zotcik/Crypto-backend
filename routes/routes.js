const express = require("express");
const coin = require("../controllers/coin");
const exchanges = require("../controllers/exchanges");
const transactions = require("../controllers/transactions");
const exchangesTagAddress = require("../controllers/exchangesTagAddress");
const holders = require("../controllers/holders");
const labelCoins = require("../controllers/labelCoins");
const telegram = require("../controllers/telegram");
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

//localhost:5000/api/updateTopExchanges
router.get("/updateTopExchanges", coin.updateTopExchanges);

//localhost:5000/api/updateHolders
router.get("/updateHolders", coin.updateHolders);

//localhost:5000/api/updateCoinsInfoHighLow
router.get("/updateCoinsInfoHighLow", coin.updateCoinsInfoHighLow);

//localhost:5000/api/updateVolumeExchanges
router.get("/updateVolumeExchanges", exchanges.updateVolumeExchanges);

//localhost:5000/api/updateInfoExchanges
router.get("/updateInfoExchanges", exchanges.updateInfoExchanges);

//localhost:5000/api/getExchangesFromDb
router.get("/getExchangesFromDb", exchanges.getExchangesFromDb);

//localhost:5000/api/newTransactions
router.get("/newTransactions", transactions.newTransactions);

//localhost:5000/api/getTransactionsFromDb
router.get("/getTransactionsFromDb", transactions.getTransactionsFromDb);

//localhost:5000/api/deleteRecords
router.get("/deleteRecords", transactions.deleteRecords);

//localhost:5000/api/getExchangesTagAddressFromDb
router.get("/getExchangesTagAddressFromDb", exchangesTagAddress.getExchangesTagAddressFromDb);

//localhost:5000/api/updateBalanceCountTxn
router.get("/updateBalanceCountTxn", exchangesTagAddress.updateBalanceCountTxn);

//localhost:5000/api/getHoldersFromDb
router.get("/getHoldersFromDb", holders.getHoldersFromDb);

//localhost:5000/api/newHolders
router.get("/newHolders", holders.newHolders);

//localhost:5000/api/getLabelsCoisFromDb
router.get("/getLabelsCoisFromDb", labelCoins.getLabelsCoisFromDb);

//localhost:5000/api/newLabels
router.get("/newLabels", labelCoins.newLabels);

//localhost:5000/api/getTelegram
router.get("/getTelegram", telegram.getTelegram);

module.exports = router;
