const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangesTagAddressSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false
  },
  balance: {
    type: Number,
    required: false
  },
  count_txn: {
    type: Number,
    required: false
  },
});

module.exports = mongoose.model("tag-address-exchanges", exchangesTagAddressSchema);
