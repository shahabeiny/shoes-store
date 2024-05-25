const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

const Size = mongoose
.Schema({
  sizeNumber: { type: Number, required: true }
},{
  toJSON: { virtuals: true },
}).plugin(time_stamp);

  Size.virtual('productSizes', {
    ref: 'ProductSize',
    localField: '_id',
    foreignField: 'size'
  });
  
  module.exports = mongoose.model('Size', Size);