const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

module.exports = mongoose.model("OrderProducts",new mongoose.Schema({
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  },
  productColor : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'ProductColor'
  },
  productSize : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'ProductSize'
  },
  finalPrice: { type: Number,default:0 },
  offs: { type: Number },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Order'
  },
  count: { type: Number,default:1 },
  }).plugin(time_stamp)
);
