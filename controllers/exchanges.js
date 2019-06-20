const Exchanges = require("../models/Exchanges");
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
  // const ids = '331,157,343,350,410,403,330,112,402,301,73,106,346,315,200,351,139,201,363,16,17,21,22,24,32,34,36,37,42,46,50,57,61,68,70,71,72,77,80,82,89,92,95,96,98,100,102,104,107,108,109,110,111,121,125,127,137,138,142,144,146,147,149,151,152,155,158,166,171,174,177,183,185,191,193,194,196,202,206,207,209,210,213,219,221,223,224,225,228,232,234,235,238,242,243,245,246,248,249,250,252,253,254,257,258,261,265,267,270,277,278,279,280,286,288,289,290,292,293,294,298,300,302,303,304,307,310,311,312,314,316,317,320,321,322,323,324,325,326,327,328,333,334,335,337,339,340,341,344,347,348,352,353,354,355,357,358,359,360,361,362,364,367,368,369,370,372,373,374,375,376,380,382,383,384,385,386,388,391,392,394,398,400,401,404,405,406,407,409,411,412,413';
  rp({
    method: "GET",
    uri: `${keys.uri}/exchange/info?id=${ids}`,
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
          const {
            logo,
            urls,
          } = currentExchange;
          await Exchanges.updateOne(
            { "id" : currentExchange.id },
            {
              $set:
                {
                  "logo": logo,
                  "website": urls.website && urls.website.length !== 0 ? urls.website[0] : "",
                  "twitter": urls.twitter && urls.twitter.length !== 0 ? urls.twitter[0] : "",
                  "chat": urls.chat && urls.chat.length !== 0 ? urls.chat[0] : "",
                  "fee": urls.fee && urls.fee.length !== 0 ? urls.fee[0] : "",
                  "blog": urls.blog && urls.blog.length !== 0 ? urls.blog[0] : "",
                }
            }
          );
        }
      }
      res.status(200).send("Success update info exchanges!")
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
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
