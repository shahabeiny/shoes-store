const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

module.exports = mongoose.model(
  "Rate",new mongoose.Schema({
    rate: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  }).plugin(time_stamp)
);
