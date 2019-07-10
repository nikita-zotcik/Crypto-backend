const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelCoinsSchema = new Schema({
  blockchain: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("label-coins", labelCoinsSchema);
