const Item = require("../models/Item");
const Exchanges = require("../models/Exchanges");
const keys = require("../config/keys");
const rp = require("request-promise");

module.exports.getCoins = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/cryptocurrency/listings/latest`,
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
      // console.log('--------ids:', ids);
      // getAllData(ids);
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.getCoinsFullInfo = async (req, res) => {
  // const ids = '1,1027,52,2,1831,1765,1839,3602,825,512,2010,1958,328,131,3794,1720,1376,1321,2011,873,1518,2566,1437,1975,2083,3635,1697,3077,74,1684,3408,1808,3718,1168,1214,1274,2682,2222,2563,2577,2469,2603,1896,1567,1866,1104,2874,372,1521,3330,2502,2099,463,3224,2087,109,693,2405,1700,213,1750,1886,1703,1230,1042,3724,1903,3144,2130,2416,3662,1320,2299,3115,1759,1776,1343,2349,1455,3437,2300,1414,3607,3116,2308,2457,2027,3829,3709,291,1925,2900,1908,3218,2885,1698,2092,1807,2492,1586,1934,2631,2588,1966,2137,2694,118,1229,3835,2897,3930,2135,2062,1789,1087,2530,2346,2213,3814,3788,3513,2132,3890,2453,2840,3657,2606,3822,2843,1982,2433,2090,1727,2044,2403,3871,1169,3418,2496,2251,2545,3415,1757,2276,2829,2246,1772,2306,3344,2777,2772,3155,2539,2638,66,2989,2608,3828,2570,1785,541,3863,2444,1637,2585,45,258,1710,3701,2760,1816,2307,3756,1758,3714,3083,3702,2896,2057,99,2955,2043,1788,67,2586,2845,1492,3085,201,3020,2992,3695,2424,1659,1712,2036,1619,3325,2298,3737,3874,2605,789,3154,2345,3847,2455,3126,3783,3345,2780,2930,3364,2381,3715,3175,2394,2934,1826,2320,2034,2289,2021,3306,2297,1680,2161,2243,3873,3826,1954,1937,3951,2335,1159,3637,3617,1955,2095,2458,3600,3684,2296,2599,2071,1993,2143,1918,3404,3884,3773,2267,2235,3147,1660,2835,2096,3178,2212,2861,1853,1505,2181,377,3846,460,3731,2447,2915,1876,3733,2400,707,2364,2937,2939,2066,2112,2476,2474,1654,1026,3164,1828,2556,2918,2627,1923,2661,3843,268,2538,2313,1779,3631,470,2446,2544,2505,2277,2767,2274,2727,1974,2559,3772,64,3307,2369,3609,1983,2873,2204,1768,3139,1817,2239,3956,405,2223,2600,2507,2471,2371,2503,3066,2552,1732,1405,2506,1814,3686,1856,2826,3366,3063,624,5,1447,2645,2379,3475,1409,1358,558,2673,1949,1723,1596,2642,2765,3251,2576,1609,1947,2344,2428,2398,1726,3,3928,2473,2591,3664,1475,2321,3070,2287,2316,3281,2153,588,2633,3840,2019,2341,573,1312,2399,2336,2953,1298,1976,1711,1681,2526,2553,2548,3944,1022,2554,2838,1899,2511,406,2869,2876,1996,1984,2644,1864,2033,2991,3683,2303,2847,3932,3316,2866,3650,723,2726,3911,1834,2533,3716,2120,3648,1841,2675,1403,2524,2058,2735,254,1883,3722,3612,2467,3710,2830,2698,3845,2392,2998,1715,3976,2665,2602,1590,8,2081,42,215,2061,1769,914,3769,2429,2916,2291,170,3811,2540,3948,2693,2725,2498,2868,2482,576,1775,132,3466,2737,2945,3655,2245,1784,2901,2958,2561,2354,3515,3029,2685,2650,3719,1658,3156,2763,2480,1473,2776,2711,3754,3260,2472,2375,2641,3842,3666,3838,3632,2158,3853,448,3815,1552,2862,1527,3081,3354,2604,2982,3816,2499,1930,3628,2430,2689,2318,1677,2209,1786,2691,3040,1172,3010,400,3301,2757,2348,2659,362,3142,212,819,3072,2766,760,584,3227,2219,3694,1050,2686,3376,1989,2748,3186,2892,2841,77,2427,2481,2064,2546,2165,623,3199,1531,2162,2001,2305,89,495,2468,1500,3618,3784,699,2827,2359,3441,2535,3337,3727,2859,2927,2709,720,3813,2739,2387,1154,2340,3622,3785,3327,323,1478,2017,2972,3082,224,2933,3988,3831,2484,2410,1881,3585,3920,3823,3870,3261,3850,3519,2669,2134,2662,2957,2175,3598,2938,3138,3279,2696,3140,1107,3015,1771,3514,2828,2149,2380,3768,2315,3371,3824,2572,2450,2758,2630,3713,2312,182,2107,3712,3065,3663,2439,2578,2060,1950,3748,3305,3233,2667,3698,895,2882,2610,1719,2342,2337,3867,2479,1704,3893,3052,1044,1244,2437,2527,1636,2094,2595,3634,1810,2343,2490,706,1737,1556,25,3962,2569,833,3022,3297,2536,3474,3461,2497,2666,3581,3608,1905,2357,2389,1208,2620,3830,2643,2597,3352,3389,6,2184,2634,2621,3200,3651,2477,2248,3854,2880,3703,1751,3636,2438,2723,2006,1070,3438,122,3323,2714,1587,2579,366,2908,2466,2390,2558,3499,2275,233,2283,3096,3314,2047,2493,2176,3913,3243,2078,2891,1638,2692,1367,2382,3388,1281,3016,3055,2913,2309,2762,2178,1082,3435,2949,333,2391,1669,3658,3590,2688,1998,3471,3735,2022,3638,90,2702,1125,184,3711,3023,2352,2764,2462,2626,3669,2718,2722,2571,3762,870,3963,823,2850,2191,3757,2088,1032,3729,3242,2516,2699,2443,2856,3014,1294,3750,3917,3520,2541,1577,2592,1616,1721,3402,2510,2363,2573,2242,2136,2562,3274,2310,2537,3809,3506,3432,1562,3084,2231,3210,2575,2674,3691,2936,2771,2525,3728,3782,2855,1838,1861,2906,3195,2773,3760,2899,1948,2564,2421,2236,2921,1480,3095,2549,3786,3334,1999,1464,3336,3825,83,2041,2500,3765,2705,2215,1611,2979,3775,3862,2567,3779,3877,2478,2325,1708,3079,1156,2865,3821,3357,3639,3738,3625,1382,2837,2360,2742,2985,2970,2105,3194,633,1739,2374,1191,626,2422,2512,2273,2144,2110,3264,2260,87,1392,416,2624,2920,3215,1916,2508,374,2893,3419,3859,2050,2104,3592,1002,3120,2877,2076,2279,1106,2708,2151,3879,3220,3340,3168,3161,322,1991,3302,2501,3118,3285,1387,3141,2956,2418,654,3237,2707,2582,2629,3240,2528,313,1340,3758,2701,2240,2551,3411,3137,3492,1304,1628,3679,2898,293,2601,2407,2775,2547,3752,2199,3894,3455,606,2879,1970,2929,2976,1399,3101,2649,2678,2249,3732,3071,3148,3596,2139,2330,2594,2912,1578,3753,2614,3024,2676,3094,3028,1466,1869,2272,3119,2584,3171,3365,3869,3742,3423,2680,2513,2863,1226,3080,3158,3661,3901,3373,1845,2611,3469';
  rp({
    method: "GET",
    uri: `${keys.uri}/cryptocurrency/info`,
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
          await Item.updateOne(
            { "id" : currentCoin.id },
            { $set: { "chat": currentCoin.urls.chat && currentCoin.urls.chat.length !== 0 ? currentCoin.urls.chat[0] : "" }});
        } else {
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
            chat:
              urls.chat && urls.chat.length !== 0 ? urls.chat[0] : "",
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
          } catch (e) {
            //error
            console.log("error", e);
          }
        }
      }
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.updateCoinsInfoSupply = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/cryptocurrency/listings/latest?limit=1000&start=2000`,
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
          console.log("item exist in the database", candidate.name);
          await Item.updateOne(
            { "id" : currentCoin.id },
            { $set: {
                "circulating_supply": currentCoin.circulating_supply ? currentCoin.circulating_supply : 0,
                "total_supply": currentCoin.total_supply ? currentCoin.total_supply : 0,
                "max_supply": currentCoin.max_supply ? currentCoin.max_supply : 0,
              }
            }
          );
        }
      }
    })
    .catch(err => {
      console.log("API call error:", err.message);
    });
};

module.exports.updateInfoExchangesCoins = async (req, res) => {
  rp({
    method: "GET",
    uri: `${keys.uri}/cryptocurrency/listings/latest?limit=1000&start=2000`,
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
          console.log("item exist in the database", candidate.name);
          await Item.updateOne(
            { "id" : currentCoin.id },
            { $set: { "num_market_pairs": currentCoin.num_market_pairs ? currentCoin.num_market_pairs : 0 }}
          );
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
