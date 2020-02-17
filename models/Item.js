const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
