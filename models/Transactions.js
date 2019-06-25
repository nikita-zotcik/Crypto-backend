const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Number,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  coin: {
    type: String,
    required: false
  },
  amount_usd: {
    type: Number,
    required: false
  },
  sender: {
    type: String,
    required: false
  },
  receiver: {
    type: String,
    required: false
  },
  symbol: {
    type: String,
    required: false
  },
  transaction_type: {
    type: String,
    required: false
  },
  transaction_count: {
    type: String,
    required: false
  },
  hash: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("transactions", transactionSchema);
