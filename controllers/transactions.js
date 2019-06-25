const keys = require("../config/keys");
const rp = require("request-promise");
const Transactions = require('../models/Transactions');

module.exports.newTransactions = async (req, res) => {
  // last month
  // const t = new Date();
  // console.log('--------date:', t.setMonth(t.getMonth() - 1));
  let start = 1559768400;
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
        for (item in transactions) {
          const currentTransaction = transactions[item];
          // start = transactions[item].timestamp;
          const candidate = await Transactions.findOne({
            id: currentTransaction.id
          });
          if (!candidate) {
            const {
              id,
              blockchain,
              symbol,
              transaction_type,
              from,
              to,
              timestamp,
              amount,
              amount_usd,
              hash,
              transaction_count
            } = currentTransaction;
            const transactionItem = new Transactions({
              id: id,
              coin: blockchain,
              symbol: symbol,
              transaction_type: transaction_type,
              sender: 'owner' in  from ? from.owner : 'unknown',
              receiver: 'owner' in  to ? to.owner : 'unknown',
              timestamp: timestamp*1000,
              amount: amount,
              amount_usd: amount_usd,
              transaction_count: transaction_count,
              hash: hash
            });
            try {
              await transactionItem.save();
              console.log("transactionItem", transactionItem.coin);
            } catch (e) {
              console.log("error", e);
            }
          }
        }
      });
  }
  res.status(200).send("Success added transactions!")
};

module.exports.getTransactionsFromDb = async (req, res) => {
  const transactions = await Transactions.find({});
  transactions.sort((a, b) => b.timestamp - a.timestamp);
  if (transactions) {
    res.status(200).send({
      transactions
    })
  }
};