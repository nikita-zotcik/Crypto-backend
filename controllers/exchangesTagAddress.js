const rp = require("request-promise");
const ExchangesTagAddress = require('../models/ExchangesTagAddress');


module.exports.getExchangesTagAddressFromDb = async (req, res) => {
  const records =  await ExchangesTagAddress.find().sort({"tag": 1});
  if (records) {
    res.status(200).send({
      records
    })
  }
};

module.exports.updateBalanceCountTxn= async (req, res) => {
  const records = await ExchangesTagAddress.find().skip(0).limit(3);
  for (i in records) {
    await rp({
      method: "GET",
      uri: `http://api.ethplorer.io/getAddressInfo/${records[i].address}?apiKey=freekey`,
      json: true,
      gzip: true
    })
      .then(async result => {
        await ExchangesTagAddress.updateOne(
          {"_id": records[i]._id},
          {
            $set: {
              "balance": result.ETH.balance ? result.ETH.balance : 0,
              "count_txn": result.countTxs ? result.countTxs : 0,
            }
          });
      })
  }
  res.status(200).send("success update record!")
};