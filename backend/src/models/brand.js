const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

const Brand = mongoose
.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
    image: { type: String},
    slug: { type: String, required: true },
    desc: { type: String, minLength: 2, maxLength: 200, required: true },
  },{
    toJSON: { virtuals: true },
  }).plugin(time_stamp);


  Brand.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'brand'
  });

  module.exports = mongoose.model('Brand', Brand);

