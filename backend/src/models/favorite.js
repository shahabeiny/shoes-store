const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

module.exports = mongoose.model("Favorite",new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Product'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  }).plugin(time_stamp)
);
