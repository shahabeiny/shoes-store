const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

module.exports = mongoose.model("Permission",new mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 60 },
    nameEng: { type: String, minLength: 2, maxLength: 60, required: true },
  }).plugin(time_stamp)
);