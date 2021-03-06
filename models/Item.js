const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  id_high_low: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  symbol: {
    type: String,
    required: false
  },
  slug: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  twitter: {
    type: String,
    required: false
  },
  chat: {
    type: String,
    required: false
  },
  reddit: {
    type: String,
    required: false
  },
  message_board: {
    type: String,
    required: false
  },
  explorer: {
    type: Array,
    required: false
  },
  technical_doc: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  source_code: {
    type: String,
    required: false
  },
  date_added: {
    type: String,
    required: false
  },
  circulating_supply: {
    type: Number,
    required: false
  },
  total_supply: {
    type: Number,
    required: false
  },
  max_supply: {
    type: Number,
    required: false
  },
  num_market_pairs: {
    type: Number,
    required: false
  },
  exchanges_top: {
    type: Object,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  volume_24h: {
    type: Number,
    required: false
  },
  percent_change_1h: {
    type: Number,
    required: false
  },
  percent_change_24h: {
    type: Number,
    required: false
  },
  percent_change_7d: {
    type: Number,
    required: false
  },
  market_cap: {
    type: Number,
    required: false
  },
  holdersCount: {
    type: Number,
    required: false
  },
  transfersCount: {
    type: Number,
    required: false
  },
  high: {
    type: Number,
    required: false
  },
  low: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("items", itemSchema);
