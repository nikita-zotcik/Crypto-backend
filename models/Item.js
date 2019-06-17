const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
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
});

module.exports = mongoose.model("items", itemSchema);