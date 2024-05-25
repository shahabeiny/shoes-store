const mongoose = require('mongoose');
const time_stamp = require('mongoose-timestamp');

const Usage = mongoose
  .Schema(
    {
      name: { type: String, required: true, minLength: 2, maxLength: 15 },
      nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
      icon: { type: String },
      slug: { type: String, required: true }
    },
    {
      toJSON: { virtuals: true }
    }
  )
  .plugin(time_stamp);

Usage.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'usage'
});

module.exports = mongoose.model('Usage', Usage);
