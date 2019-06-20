const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangesSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  slug: {
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
  fee: {
    type: String,
    required: false
  },
  blog: {
    type: String,
    required: false
  },
  num_market_pairs: {
    type: Number,
    reguired: false
  },
  volume_24h: {
    type: Number,
    reguired: false
  },
  volume_24h_adjusted: {
    type: Number,
    reguired: false
  },
  volume_7d: {
    type: Number,
    reguired: false
  },
  volume_30d: {
    type: Number,
    reguired: false
  },
  percent_change_volume_24h: {
    type: Number,
    reguired: false
  },
});

module.exports = mongoose.model("exchanges", exchangesSchema);
