const Exchanges = require("../models/Exchanges");
const Item = require("../models/Item");
const keys = require("../config/keys");
const rp = require("request-promise");

module.exports.updateVolumeExchanges = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/exchange/listings/latest?limit=1000&market_type=no_fees&convert=USD&start=1`,
    headers: {
      "X-CMC_PRO_API_KEY": keys.secret
    },
    json: true,
    gzip: true
  })
    .then(async response => {
      let exchanges = response.data;
      for (item in exchanges) {
        const currentExchange = exchanges[item];
        const candidate = await Exchanges.findOne({
          id: currentExchange.id
        });
        if (candidate) {
          console.log("item exist in the database", candidate.name);
          await Exchanges.updateOne(
            { "id" : currentExchange.id },
            {
              $set:
                {
                  "num_market_pairs": currentExchange.num_market_pairs,
                  "volume_24h": currentExchange.quote.USD.volume_24h,
                  "volume_24h_adjusted": currentExchange.quote.USD.volume_24h_adjusted,
                  "volume_7d": currentExchange.quote.USD.volume_7d,
                  "volume_30d": currentExchange.quote.USD.volume_30d,
                  "percent_change_volume_24h": currentExchange.quote.USD.percent_change_volume_24h,
                }
            }
          );
        } else {
          const {
            id,
            name,
            symbol,
            slug,
            num_market_pairs,
            quote,
          } = currentExchange;
          const exchangeItem = new Exchanges({
            id: id,
            name: name,
            symbol: symbol,
            slug: slug,
            num_market_pairs: num_market_pairs,
            volume_24h: quote.USD.volume_24h,
            volume_24h_adjusted: quote.USD.volume_24h_adjusted,
            volume_7d: quote.USD.volume_7d,
            volume_30d: quote.USD.volume_30d,
            percent_change_volume_24h: quote.USD.percent_change_volume_24h,
          });
          try {
            await exchangeItem.save();
            console.log("exchangeItem", exchangeItem.name);
          } catch (e) {
            console.log("error", e);
          }
        }
      }
      res.status(200).send("Success update volume exchanges!")
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.updateInfoExchanges = async (req, res) => {
  let id = [];
  for (let y = 0; y < id.length; y++) {
    rp({
      method: "GET",
      uri: `${keys.uri}/cryptocurrency/market-pairs/latest?id=${id[y]}&convert=USD`,
      headers: {
        "X-CMC_PRO_API_KEY": keys.secret
      },
      json: true,
      gzip: true
    })
      .then(async response => {
        let result = [];
        let str = "";
        let exchanges = response.data && response.data.market_pairs;

        if (exchanges.length !== 0 && exchanges.length >= 5) {
          let aaaa = exchanges.map((coin) => {
            return coin.quote.USD.price;
          });
          let bbbb = aaaa.sort().reverse();
          bbbb.length = 5;
          for (let i = 0; i < 5; i++) {
            exchanges.map((coin) => {
              if(coin.quote.USD.price === bbbb[i]) {
                result.push(coin.exchange.id);
                str += `,${coin.exchange.id}`;
              }
            });
          }
        } else {
          exchanges.map((coin) => {
            result.push(coin.exchange.id);
            str += `,${coin.exchange.id}`;
          })
        }
        let ids = str.replace(",", "");

        // console.log('arr--------------', ids);

        rp({
          method: "GET",
          uri: `${keys.uri}/exchange/info?id=${ids}`,
          headers: {
            "X-CMC_PRO_API_KEY": keys.secret
          },
          json: true,
          gzip: true
        }).then(async response => {
          let exachanges = [];

          for(let exchangeId in response.data) {
            const {
              logo,
              urls,
            } = response.data[exchangeId];

            exachanges.push({
              "logo": logo,
              "website": urls.website && urls.website.length !== 0 ? urls.website[0] : "",
              "twitter": urls.twitter && urls.twitter.length !== 0 ? urls.twitter[0] : "",
              "chat": urls.chat && urls.chat.length !== 0 ? urls.chat[0] : "",
              "fee": urls.fee && urls.fee.length !== 0 ? urls.fee[0] : "",
              "blog": urls.blog && urls.blog.length !== 0 ? urls.blog[0] : "",
            });
          }
          await Item.updateOne(
            { id: id[y] },
            {
              exchanges_top: exachanges
            }
          );
        }).catch(err => err);

        res.status(200).send("Success update info exchanges!")
      })
      .catch(err => {
        console.log("API call error:", err.message);
      });
  }
};

module.exports.getExchangesFromDb = async (req, res) => {
  const exchanges = await Exchanges.find({});
  exchanges.sort((a, b) => b.volume_30d - a.volume_30d);
  if (exchanges) {
    res.status(200).send({
      exchanges
    })
  }
};
