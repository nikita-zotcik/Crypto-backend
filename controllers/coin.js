const Item = require("../models/Item");
const keys = require("../config/keys");
const rp = require("request-promise");

module.exports.getCoins = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/listings/latest`,
    qs: {
      start: 1,
      limit: 1000,
      convert: "USD"
    },
    headers: {
      "X-CMC_PRO_API_KEY": keys.secret
    },
    json: true,
    gzip: true
  })
    .then(response => {
      let arrWithId = [];
      let str = "";

      response.data.forEach(element => {
        arrWithId.push(element.id);
      });

      arrWithId.map(item => {
        str += "," + item;
      });

      let ids = str.replace(",", "");
      getAllData(ids);
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.getCoinsFullInfo = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/info`,
    qs: {
      id: ids
    },
    headers: {
      "X-CMC_PRO_API_KEY": keys.secret
    },
    json: true,
    gzip: true
  })
    .then(async response => {
      let coins = response.data;
      for (coin in coins) {
        const currentCoin = coins[coin];
        const candidate = await Item.findOne({
          id: currentCoin.id
        });
        if (candidate) {
          console.log("item already exist in the database", candidate.name);
        } else {
          //   console.log("currCoin", currentCoin);
          const {
            id,
            logo,
            name,
            symbol,
            slug,
            description,
            urls,
            tags,
            date_added
          } = currentCoin;
          const item = new Item({
            id: id,
            logo: logo,
            name: name,
            symbol: symbol,
            slug: slug,
            description: description,
            website:
              urls.website && urls.website.length !== 0 ? urls.website[0] : "",
            technical_doc:
              urls.website && urls.technical_doc.length !== 0
                ? urls.technical_doc[0]
                : "",
            twitter:
              urls.website && urls.twitter.length !== 0 ? urls.twitter[0] : "",
            reddit:
              urls.website && urls.reddit.length !== 0 ? urls.reddit[0] : "",
            message_board:
              urls.website && urls.message_board.length !== 0
                ? urls.message_board[0]
                : "",
            source_code:
              urls.website && urls.source_code.length !== 0
                ? urls.source_code[0]
                : "",
            explorer: urls.explorer,
            tags: tags && tags.length !== 0 ? tags[0] : "",
            date_added: date_added ? date_added : ""
          });
          try {
            // await item.save();
            console.log("item", item.name);
          } catch {
            //error
            console.log("error");
          }
        }
      }
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.getCoinsFromDb = async (req, res) => {
  const coins = await Item.find({});
  if (coins) {
    res.status(200).send({
        coins
    })
  }
};
