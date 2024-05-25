const mongoose = require('mongoose');
const time_stamp = require('mongoose-timestamp');
const ProductSize = require('./productSize');
const OrderProducts = require('./orderProducts');


const Order = mongoose
.Schema({
  orderID: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time_cancel: Date,
  finishCart: { type: Boolean, default: false },
  status_delivery: {
    type: String,
    enum: ['delivered', 'not_delivered', 'not_confirmed', 'canceled'],
    default: 'not_confirmed'
  }
},{
  toJSON: { virtuals: true },
}).plugin(time_stamp);

Order.virtual('orderProducts', {
  ref: 'OrderProducts',
  localField: '_id',
  foreignField: 'order'
});

// Middleware to generate 8-digit unique order ID before saving
Order.pre('save', async function (next) {
  // Generate 8-digit random number
  let randomOrderID = this.orderID || generateUniqueOrderID();

  // Check if the generated orderID is unique
  const checkUniqueOrderID = async () => {
    const existingOrder = await mongoose.model('Order').findOne({ orderID: randomOrderID });
    if (existingOrder) {
      // If orderID is not unique, generate a new one and check again
      randomOrderID = generateUniqueOrderID();
      await checkUniqueOrderID();
    }
  };

  // Check uniqueness and set the orderID
  await checkUniqueOrderID();
  this.orderID = randomOrderID;
  next();
});

// Function to generate a unique 8-digit order ID
function generateUniqueOrderID() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}


// Order.pre('findOneAndUpdate', async function (next) {
//   // گرفتن اطلاعات به‌روزرسانی شده
//   const updatedFields = this.getUpdate();
//   const orderId = this._conditions._id;

//   // چک کردن شرایط مرتبط با منقضی شدن سفارش
//   if (updatedFields.time_cancel && updatedFields.time_cancel > new Date() && !updatedFields.finishCart) {
//     try {
//       // حذف محصولات مرتبط با سفارش
//       await OrderProducts.deleteMany({ order: orderId });

//       // بروزرسانی موجودی محصولات
//       const orderProducts = await OrderProducts.find({ order: orderId });
//       for (const orderProduct of orderProducts) {
//         const productSize = await ProductSize.findOne({ _id: orderProduct.productSize });
//         if (productSize) {
//           await ProductSize.updateOne(
//             { _id: orderProduct.productSize },
//             {
//               $inc: {
//                 frozen: -orderProduct.count,
//                 total: orderProduct.count,
//               },
//             }
//           );
//         }
//       }

//       // حذف سفارش
//       await Order.deleteOne({ _id: orderId });

//       // اطلاع رسانی خطا
//       next(new Error('Order has been automatically canceled.'));
//     } catch (error) {
//       console.error('Error during cancellation:', error);
//       next(error);
//     }
//   } else {
//     next();
//   }
// });




module.exports = mongoose.model('Order', Order);
