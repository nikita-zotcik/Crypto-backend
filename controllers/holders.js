const rp = require("request-promise");
const Holders = require('../models/Holders');
const Item = require('../models/Item');


module.exports.getHoldersFromDb = async (req, res) => {
  const token_coin = req.query.token;
  const records =  await Holders.find({'token_coin': token_coin});
  if (records) {
    res.status(200).send({
      records
    })
  }
};

module.exports.newHolders= async (req, res) => {
  let records = await Item.find();
  records = records.filter(item => item.holdersCount);
  records = records.slice(30,39);//start=0&end=10
  for(let i in records) {
    const item = records[i];
    let token = '';
    item.explorer.forEach(temp => {
      const str = temp.split('/');
      if (str[2] === 'etherscan.io') token = str[4];
    });
    if(!token) token = '';
    if(token.length < 20) {
      item.explorer.forEach(temp => {
        const str = temp.split('/');
        if (str[2] === 'ethplorer.io') token = str[4];
      });
    }
    await rp({
      method: "GET",
      uri: `https://api.ethplorer.io/getTopTokenHolders/${token}?apiKey=freekey&limit=100`,
      json: true,
      gzip: true
    })
      .then(async result => {
        for(let j in result.holders) {
          console.log('--------j:', j);
          const holder = result.holders[j];
          const record = new Holders({
            token_coin: token,
            holders_token: holder.address,
            balance: holder.balance,
            share: holder.share,
            total_supply: item.total_supply
          });
          try {
            console.log('save');
            await record.save();
          } catch (e) {
            console.log("error", e);
          }
        }
      })
  }
  res.status(200).send("success added new records!")
};