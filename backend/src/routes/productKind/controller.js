const controller = require('./../controller');
const Color = require('../../models/color');
const Size = require('../../models/size');
const Product = require('../../models/product');
const Rate = require('../../models/rate');
const Favorite = require('../../models/favorite');
const ProductColor = require('../../models/productColor');
const ProductSize = require('../../models/productSize');

module.exports = new (class extends controller {
  async getKindProducts(req, res) {
    let productInfo = await this.findProduct(req.params.slug);

    return this.response({
      res,
      message: 'لیست تنوع محصولات ',
      data: {
        colors: await Color.find({}).sort({ createdAt: -1 }).select('-__v'),
        sizes: await Size.find({}).sort({ createdAt: -1 }).select('-__v'),
        product: productInfo,
        productColors: await this.findProductColor(productInfo._id)
      }
    });
  }

  async getShopKindProducts(req, res) {
    let user = req.user || {};
    let productInfo = await this.findProduct(req.params.slug);

    return this.response({
      res,
      message: 'لیست تنوع محصول ',
      data: {
        product: productInfo,
        rate: user._id ? await this.checkIsRateProduct(user._id, productInfo._id) : 0,
        isFavorite: user._id ? await this.checkIsFavoriteProduct(user._id, productInfo._id) : false,
        productColors: await this.findProductColor(productInfo._id)
      }
    });
  }

  async saveProductColor(req, res) {
    let { colorId, productId } = req.body;
    if (await this.checkExistColor(res, colorId, productId, 409, 'این تنوع رنگ قبلا ثبت شده است')) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (!hasImage) {
      return this.response({ res, code: 400, message: 'no file uploaded' });
    }

    const image = await this.upload(req.files.image, 'image', res);
    let newKind = await ProductColor.create({ image, color: colorId, product_id: productId });
    newKind = await newKind.populate([{ path: 'color', select: '-v' }]);

    return this.response({
      res,
      code: 201,
      message: 'تنوع رنگ جدید با موفقیت ذخیره شد',
      data: {
        ...newKind.toJSON(),
        productSizes: []
      }
    });
  }

  async editProductColor(req, res) {
    let { colorId, productId, productColorId } = req.body;

    let editValues = { color: colorId };

    if (
      await this.checkExistColor(
        res,
        colorId,
        productId,
        409,
        'این تنوع رنگ قبلا ثبت شده است',
        productColorId
      )
    ) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (hasImage) {
      editValues.image = await this.upload(req.files.image, 'image', res);
    }

    return this.response({
      res,
      message: 'محصول با موفقیت ویرایش شد',
      data: await ProductColor.findByIdAndUpdate({ _id: productColorId }, editValues, {
        new: true
      })
        .select('_id image')
        .populate([
          { path: 'color', select: '-v' },
          { path: 'productSizes', select: '-v', populate: { path: 'size', select: '-v' } }
        ])
        .lean()
    });
  }

  async addProductSize(req, res) {
    let { sizeId, total, eachCart, sold, frozen, price, productColorId } = req.body;
    if (await this.checkExistSize(res, sizeId, productColorId, 409, 'این سایز قبلا ثبت شده است')) {
      return;
    }

    let createSize = await ProductSize.create({
      total,
      eachCart,
      frozen,
      sold,
      price,
      size: sizeId,
      productColor: productColorId
    });

    createSize = await createSize.populate({ path: 'size', select: '-__v' });

    return this.response({
      res,
      code: 201,
      message: 'اطلاعات سایز جدید با موفقیت ذخیره شد',
      data: createSize
       
    });
  }

  async editProductSize(req, res) {
    let { sizeId, total, eachCart, sold, frozen, price, _id, productColorId } = req.body;

    if (await this.checkExistSize(res, sizeId, productColorId, 409, 'این سایز قبلا ثبت شده است', _id)) {
      return;
    }
    return this.response({
      res,
      message: 'محصول با موفقیت ویرایش شد',
      data: await ProductSize.findOneAndUpdate(
        { _id },
        { size: sizeId, total, eachCart, sold, frozen, price },
        { new: true }
      )
        .populate({ path: 'size', select: '-__v' })
        .lean()
        .select('-__v')
        .sort({ createdAt: -1 })
    });
  }

  async findProductColor(productId) {
    let kinds = await ProductColor.find({ product_id: productId })
      .populate([
        { path: 'color', select: '-__v' },
        { path: 'productSizes', select: '-__v', populate: { path: 'size', select: '-__v' } }
      ])
      .select('-__v -product_id')
      .lean();

    return kinds.map((product) => ({
      ...product,
      productSizes: product.productSizes.map((sizeInfo) => ({
        ...sizeInfo
      }))
    }));
  }

  async findProduct(slug) {
    return await Product.findOne({ slug })
      .populate([{ path: 'usage' }, { path: 'brand' }])
      .select('-v');
  }

  async checkExistColor(res, colorId, productId, code, message, _id = '') {
    const query = { product_id: productId, color: colorId };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (await ProductColor.exists(query)) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }

  async checkExistSize(res, sizeId, productColorId, code, message, _id = '') {
    const query = { size: sizeId, productColor: productColorId };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (await ProductSize.exists(query)) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }

  async checkIsFavoriteProduct(userId, productId) {
    return !!(await Favorite.exists({ user: userId, product: productId }));
  }

  async checkIsRateProduct(userId, productId) {
    let rate = 0;
    let findRate = await Rate.findOne({ user: userId, product: productId });
    if (findRate) rate = findRate.rate;
    return rate;
  }
})();
