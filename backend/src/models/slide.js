const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");


const Slide = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
}).plugin(time_stamp)



module.exports = mongoose.model("Slide",Slide);