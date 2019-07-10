const rp = require("request-promise");
const keys = require("../config/keys");
const LabelCoins = require('../models/LabelCoins');

module.exports.getLabelsCoisFromDb = async (req, res) => {
  const records =  await LabelCoins.find();
  if (records) {
    res.status(200).send({
      records
    })
  }
};

module.exports.newLabels= async (req, res) => {
  let start = 1560064446;
  let cursor = '';
  let count = -1;
  let blockchains = [];
  let owners = [];
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
      .then(async response => {
        let records = response.transactions;
        count = response.count;
        cursor = response.cursor;
        for (let i in records) {
          const item = records[i];
          if ('owner' in item.to && item.to.owner !== 'unknown') {
            if (owners.indexOf(item.to.owner) < 0) {
              console.log('new owner');
              const record = new LabelCoins({
                blockchain: item.blockchain,
                address: item.to.address,
                owner: item.to.owner,
              });
              try {
                console.log('save');
                await record.save();
                blockchains.push(item.blockchain);
                owners.push(item.to.owner);
              } catch (e) {
                console.log("error", e);
              }
            } else {
              if (blockchains[owners.indexOf(item.to.owner)] !== item.blockchain) {
                console.log('not new owner, but new blockchains');
                const record = new LabelCoins({
                  blockchain: item.blockchain,
                  address: item.to.address,
                  owner: item.to.owner,
                });
                try {
                  console.log('save');
                  await record.save();
                  blockchains.push(item.blockchain);
                  owners.push(item.to.owner);
                } catch (e) {
                  console.log("error", e);
                }
              }
            }
          }
        }
      });
  }
  res.status(200).send("success added new records!")
};