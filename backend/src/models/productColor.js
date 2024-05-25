const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

const ProductColor = mongoose.Schema({
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    image: { type: String,required: true },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    }
  },{
    toJSON: { virtuals: true },
  }).plugin(time_stamp);

  ProductColor.virtual('productSizes', {
    ref: 'ProductSize',
    localField: '_id',
    foreignField: 'productColor'
  });

  module.exports = mongoose.model("ProductColor",ProductColor);