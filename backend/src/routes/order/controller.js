const controller = require('../controller');
const OrderProducts = require('../../models/orderProducts');
const Order = require('../../models/order');
const ProductSize = require('../../models/productSize');

module.exports = new (class extends controller {
  async addCart(req, res) {
    try {
      const { productId, productColorId, productSizeId } = req.body;
      const messageInfo = { msg: '', code: 200, data: {} };

      // 1. Check if the product is in stock
      const getProductInfo = await ProductSize.findOne({ _id: productSizeId });

      if (getProductInfo.total === 0) {
        return this.response({
          res,
          code: 422,
          message: 'محصول موجودی ندارد'
        });
      }

      // 2. Check if the user has an open order, create one if not
      let findOrder = await Order.findOne({ user: req.user._id, finishCart: false });

      if (!findOrder) {
        findOrder = await Order.create({
          time_cancel: this.addHours(new Date(), 24),
          user: req.user._id
        });

        // Create OrderProducts for the new order
        await OrderProducts.create({
          product: productId,
          productColor: productColorId,
          productSize: productSizeId,
          order: findOrder._id
        });
      } else {
        // 3. Check if the product already exists in the order
        const existProductInOrder = await OrderProducts.findOne({
          order: findOrder._id,
          productSize: productSizeId
        });

        if (existProductInOrder) {
          // 4. If the product exists, update its quantity
          if (existProductInOrder.count < getProductInfo.eachCart) {
            await OrderProducts.findByIdAndUpdate(
              existProductInOrder._id,
              { $inc: { count: 1 } },
              { new: true }
            ).populate([{ path: 'product' }, { path: 'productColor' }, { path: 'productSize' }]);
          } else {
            return this.response({
              res,
              code: 401,
              message: `شما دارای محدودیت ${getProductInfo.eachCart} جفت در هر سبد می باشید`
            });
          }
        } else {
          // 5. If the product is not in the order, add it
          await OrderProducts.create({
            product: productId,
            productColor: productColorId,
            productSize: productSizeId,
            order: findOrder._id
          });
        }
      }

      // 6. Update the product size information
      const updatedProductSize = await ProductSize.findOneAndUpdate(
        { _id: productSizeId },
        { $inc: { total: -1, frozen: 1 } },
        { new: true }
      )
        .populate({ path: 'size', select: '_id sizeNumber' })
        .select('-__v -updatedAt');

      const successMessage = findOrder ? 'سفارش با موفقیت ثبت شد' : 'محصول با موفقیت به سفارش افزوده شد';

      return this.response({
        res,
        code: 201,
        message: successMessage,
        data: updatedProductSize
      });
    } catch (error) {
      console.error(error);
      return this.response({
        res,
        code: 500,
        message: 'خطایی در سرور رخ داده است'
      });
    }
  }

  async muinesCart(req, res) {
    try {
      const { productSizeId, productOrderId } = req.body;

      // Update ProductSize
      const productUpdated = await ProductSize.findByIdAndUpdate(
        productSizeId,
        { $inc: { total: 1, frozen: -1 } },
        { new: true }
      )
        .populate({ path: 'size', select: '_id sizeNumber' })
        .lean();

      // Update OrderProducts
      await OrderProducts.updateOne({ _id: productOrderId }, { $inc: { count: -1 } });

      return this.response({
        res,
        message: 'تعداد با موفقیت کم شد',
        data: productUpdated
      });
    } catch (error) {
      console.error('Error in muinesCart:', error);
      return this.response({
        res,
        message: 'خطا در انجام عملیات',
        error: error.message || 'خطای ناشناخته'
      });
    }
  }

  async deleteCart(req, res) {
    try {
      const { orderId } = req.params;

      const orderProducts = await OrderProducts.find({ order: orderId }).populate({
        path: 'productSize'
      });

      for (const pro of orderProducts) {
        pro.productSize.frozen -= pro.count;
        pro.productSize.total += pro.count;
        await pro.productSize.save();
      }

      await Order.deleteOne({ _id: orderId });
      await OrderProducts.deleteMany({ order: orderId });

      return this.response({
        res,
        message: 'کل سبد خرید با موفقیت حذف شد'
      });
    } catch (error) {
      console.error(error);
      return this.response({
        res,
        statusCode: 500,
        message: 'خطایی در حذف سبد خرید رخ داده است'
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { productOrderId } = req.params;
      const deleteSuccessMessage = 'محصول با موفقیت از سبد خرید حذف شد';

      const findProductOrder = await OrderProducts.findById(productOrderId);

      if (!findProductOrder) {
        return this.response(
          {
            res,
            message: 'محصولی با این شناسه یافت نشد'
          },
          404
        );
      }

      const countProductInOrder = await OrderProducts.countDocuments({ order: findProductOrder.order });

      if (countProductInOrder === 1) {
        // There is only this product in the shopping cart
        await Order.deleteOne({ _id: findProductOrder.order });
        await OrderProducts.deleteMany({ order: findProductOrder.order });
      } else {
        await Order.deleteOne({ _id: findProductOrder.order });
      }

      const updatedProductSize = await ProductSize.findByIdAndUpdate(
        findProductOrder.productSize,
        { $inc: { total: 1, frozen: -1 } },
        { new: true }
      )
        .populate({
          path: 'size',
          select: '_id sizeNumber'
        })
        .select('-__v -updatedAt');

      return this.response({
        res,
        message: deleteSuccessMessage,
        data: updatedProductSize
      });
    } catch (error) {
      console.error(error);
      return this.response(
        {
          res,
          message: 'خطا در حذف محصول از سبد خرید',
          error: error.message
        },
        500
      );
    }
  }

  async getOrders(req, res) {
    const { q, activeTab } = req.query;
    let data = [];

    const queryOptions = activeTab ? { status_delivery: activeTab } : {};

    if (q === 'cart') {
      const orderInfo = await Order.findOne({ user: req.user._id, finishCart: false })
        .sort({ createdAt: -1 })
        .select('-__v -updatedAt -user');

      if (orderInfo) {
        const products = await this.getOrderProducts(orderInfo._id);
        data.push({ orderInfo, products });
      }
    } else if (q === 'me') {
      const query = { user: req.user._id, finishCart: true, ...queryOptions };
      const orderInfo = await Order.find(query)
        .sort({ createdAt: -1 })
        .select('-__v -updatedAt -user')
        .lean();

      if (orderInfo.length > 0) {
        data = await Promise.all(
          orderInfo.map(async (order) => {
            const products = await this.getOrderProducts(order._id);
            return { orderInfo: { ...order }, products };
          })
        );
      }
    }

    return this.response({ res, message: 'لیست سفارشات خرید', data });
  }

  async getOrdersAdmin(req, res) {
    const { activeTab } = req.query;
    let data = [];

    const queryOptions = activeTab ? { status_delivery: activeTab } : {};

    const query = { finishCart: true, ...queryOptions };
    const orderInfo = await Order.find(query)
      .populate({ path: 'user', select: 'username email avatar mobile address' })
      .sort({ createdAt: -1 })
      .select('-__v -updatedAt')
      .lean();

    if (orderInfo.length > 0) {
      data = await Promise.all(
        orderInfo.map(async (order) => {
          const products = await this.getOrderProducts(order._id);
          return { orderInfo: { ...order }, products };
        })
      );
    }

    return this.response({ res, message: 'لیست سفارشات خرید', data });
  }

  async confirmOrder(req, res) {
    const { orderId, operate } = req.body;
    let kindOperate = operate ? { status_delivery: 'not_delivered' } : { status_delivery: 'canceled' };
    const updatedOrder = await Order.findByIdAndUpdate(orderId, kindOperate, { new: true }).select(
      '-__v -updatedAt'
    );

    if (!operate) {
      const orderProducts = await OrderProducts.find({ order: orderId }).populate({
        path: 'productSize'
      });

      for (const pro of orderProducts) {
        pro.productSize.sold -= pro.count;
        pro.productSize.total += pro.count;
        await pro.productSize.save();
      }
    }

    return this.response({
      res,
      message: `سفارش با موفقیت ${operate ? 'تایید' : 'کنسل'} شد`,
      data: updatedOrder
    });
  }

  async finishCart(req, res) {
    let { orderId, name, family, address } = req.body;

   let changeUser = await this.User.findByIdAndUpdate(req.user._id, { name, family, address }, { new: true })
      .populate({
        path: 'role',
        select: '-__v',
        populate: {
          path: 'permissions',
          select: '-__v'
        }
      })
      .select('-__v -password -otp');

    let getAllPro = await OrderProducts.find({ order: orderId }).populate({
      path: 'productSize'
    });

    for (let pro of getAllPro) {
      let productSize = pro.productSize;

      pro.finalPrice = productSize.price;
      await pro.save();

      productSize.frozen = productSize.frozen - pro.count;
      productSize.sold = productSize.sold + pro.count;
      await productSize.save();
    }

    await Order.updateOne({ _id: orderId }, { finishCart: true });
    return this.response({
      res,
      message: 'سفارش نهایی شد',
      data:changeUser
    });
  }

  /////////// helper method

  async getOrderProducts(orderId) {
    const products = await OrderProducts.find({ order: orderId })
      .populate([
        { path: 'product', select: '_id name nameEng image desc slug' },
        {
          path: 'productColor',
          select: '_id image',
          populate: { path: 'color', select: '-__v -updatedAt' }
        },
        {
          path: 'productSize',
          select: '_id total eachCart frozen sold image price',
          populate: { path: 'size', select: '-__v -updatedAt' }
        }
      ])
      .lean();
    return products;
  }

  addHours(date, hours) {
    //     let currentDate = new Date();

    // // اضافه کردن 2 دقیقه
    // currentDate.setMinutes(currentDate.getMinutes() + 2);
    return date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  }
})();
