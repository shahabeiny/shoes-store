const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");


const Product = mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 15 },
  nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
  image: { type: String,required: true },
  slug: { type: String, required: true },
  desc: { type: String, minLength: 2, maxLength: 400, required: true },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  usage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usage",
  },
  is_deleted: { type: Boolean, default: false },
},{
  toJSON: { virtuals: true },
}).plugin(time_stamp)


Product.virtual('productColors', {
  ref: 'ProductColor',
  localField: '_id',
  foreignField: 'product_id'
});

Product.virtual('productSizes', {
  ref: 'ProductSize',
  localField: '_id',
  foreignField: 'product'
});

Product.virtual('rates',{
  ref:'Rate',
  localField:'_id',
  foreignField:'product'
})

Product.set('toObject', { virtuals: true });
Product.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Product",Product);