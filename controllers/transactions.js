const rp = require("request-promise");
var cron = require('node-cron');
const keys = require("../config/keys");
const Transactions = require('../models/Transactions');

module.exports.newTransactions = async (req, res) => {
  let start = 1559768400; //1550237797
  let cursor = '';
  let count = -1;
  while(count !== 0) {
    await rp({
      method: "GET",
      uri: `${keys.uriWhaleAtert}/transactions?api_key=${keys.apiKeyWhaleAlert}&start=${start}&cursor=${cursor}`,
      headers: {
        "X-CMC_PRO_API_KEY": keys.secret
      },
      json: true,
      gzip: true
    })
      .then( async response => {
        let transactions = response.transactions;
        count = response.count;
        cursor = response.cursor;
        await Transactions.insertMany(transactions);
      });
  }
  res.status(200).send("Success added transactions!")
};

module.exports.getTransactionsFromDb = async (req, res) => {
  const last_id = 'id' in req.query ? req.query.id : '';
  const transactions = 'id' in req.query
    ? await Transactions.find({'_id': {'$lt': last_id}}).sort({"_id": -1}).limit(100)
    : await Transactions.find().sort({"_id": -1}).limit(100);
  const countRecords = await Transactions.countDocuments();
  if (transactions) {
    res.status(200).send({
      transactions: transactions,
      countRecords: countRecords,
    })
  }
};

module.exports.deleteRecords = async (req, res) => {
  // const skip = 8000;
  // const record = await Transactions.find().skip(skip).limit(1000);
  // for(item in record) {
  //   console.log('--------item:', item);
  //   // if(record[item].timestamp.toString().length > 10) {
  //   if('sender' in record[item]){
  //     console.log('item');
  //     await Transactions.updateOne(
  //       { "id" : record[item].id },
  //       { $set: {
  //           "timestamp": record[item].timestamp.toString().length > 10 ? record[item].timestamp / 1000 : record[item].timestamp,
  //           "from": {owner: record[item].sender},
  //           "to": {owner: record[item].receiver},
  //           "blockchain": record[item].coin,
  //         }
  //       });
  //   }
  // }

  // await Transactions.deleteMany({'blockchain': null}).then(result => res.status(200).send({result}));
};

cron.schedule('*/2 * * * *', async () => {
  console.log('running a task every two minutes HERE');
  let start = Math.ceil(((new Date()).getTime() - 120000) / 1000);
  let cursor = '';
  let count = -1;
  while(count !== 0) {
    await rp({
      method: "GET",
      uri: `${keys.uriWhaleAtert}/transactions?api_key=${keys.apiKeyWhaleAlert}&start=${start}&cursor=${cursor}`,
      headers: {
        "X-CMC_PRO_API_KEY": keys.secret
      },
      json: true,
      gzip: true
    })
      .then( async response => {
        let transactions = response.transactions;
        count = response.count;
        cursor = response.cursor;
        await Transactions.insertMany(transactions);
      });
  }
});