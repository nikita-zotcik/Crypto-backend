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
  const transactions = 'id' in req.query ? await Transactions.find({'_id': {'$gt': last_id}}).limit(100) : await Transactions.find().limit(100);
  // transactions.sort((a, b) => b.timestamp - a.timestamp);
  const countRecords = await Transactions.countDocuments();
  if (transactions) {
    res.status(200).send({
      transactions: transactions,
      countRecords: countRecords,
    })
  }
};

module.exports.deleteRecords = async (req, res) => {
  const records = await Transactions.find().limit(100000);
  await Transactions.deleteMany({'_id': {'$lt': records[records.length - 1]._id}});
  res.status(200).send('Success delete')
};

// cron.schedule('*/2 * * * *', async () => {
//   console.log('running a task every two minutes HERE');
//   let start = Math.ceil(((new Date()).getTime() - 120000) / 1000);
//   let cursor = '';
//   let count = -1;
//   while(count !== 0) {
//     await rp({
//       method: "GET",
//       uri: `${keys.uriWhaleAtert}/transactions?api_key=${keys.apiKeyWhaleAlert}&start=${start}&cursor=${cursor}`,
//       headers: {
//         "X-CMC_PRO_API_KEY": keys.secret
//       },
//       json: true,
//       gzip: true
//     })
//       .then( async response => {
//         let transactions = response.transactions;
//         count = response.count;
//         cursor = response.cursor;
//         await Transactions.insertMany(transactions);
//       });
//   }
// });