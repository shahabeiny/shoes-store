const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

const Color = mongoose
.Schema({
    color: { type: String, required: true },
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true }
  },{
    toJSON: { virtuals: true },
  }).plugin(time_stamp);


  Color.virtual('productColors', {
    ref: 'ProductColor',
    localField: '_id',
    foreignField: 'color'
  });
  
  module.exports = mongoose.model('Color', Color);