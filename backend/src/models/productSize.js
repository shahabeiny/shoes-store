const mongoose = require('mongoose');
const time_stamp = require('mongoose-timestamp');
const moment = require('jalali-moment');

const ProductSize = mongoose
  .Schema({
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productColor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductColor'
    },
    total: { type: Number, required: true },
    eachCart: { type: Number, default: 1 },
    frozen: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    price: { type: Number, required: true }
  })
  .plugin(time_stamp);

ProductSize.virtual('date').get(function () {
  return moment(this.time_stamp).locale('fa').format('D MMMM YYYY');
});

module.exports = mongoose.model('ProductSize', ProductSize);
