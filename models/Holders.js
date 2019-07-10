const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdersSchema = new Schema({
  token_coin: {
    type: String,
    required: false,
  },
  holders_token: {
    type: String,
    required: false
  },
  balance: {
    type: Number,
    required: false
  },
  share: {
    type: Number,
    required: false
  },
  total_supply: {
    type: Number,
    required: false
  },
  tag: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("holders", holdersSchema);
