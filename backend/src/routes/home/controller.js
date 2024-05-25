const controller = require('../controller');
const Product = require('../../models/product');
const Slide = require('../../models/slide');
const Brand = require('../../models/brand');
const Usage = require('../../models/usage');
const OrderProducts = require('../../models/orderProducts');

module.exports = new (class extends controller {
  async main(req, res) {
    res.cookie("token","shahab")
    this.response({
      res,
      message: ' لیست محصولات ',
      data: {
        newest: await this.getNewestProducts(),
        mainSlider: await this.getMainSliders(),
        sellingProducts: await this.findBestSellingProducts()
      }
    });
  }

  async header(req, res) {
    let data = {};
    data.brands = await Brand.find().select('-__v');
    data.usages = await Usage.find().select('-__v');
    this.response({ res, message: ' لیست هدر ', data });
  }

  async getMainSliders() {
    let data = [];
    const slideProducts = await Slide.find({}).sort({ createdAt: -1 });

    if (slideProducts.length !== 0) {
      const productsArray = slideProducts.map((slide) => slide.product);
      data = await Product.find({ _id: { $in: productsArray } })
        .populate([
          { path: 'brand', select: '-__v' },
          { path: 'usage', select: '-__v' },
          { path: 'productColors', populate: [{ path: 'color' }, { path: 'productSizes', populate: 'size' }] }
        ])
        .lean();
    }
    return data;
  }

  async getNewestProducts(limit = 10) {
     let products =  await Product.find({})
      .limit(limit)
      .populate([
        { path: 'brand', select: '-__v' },
        { path: 'usage', select: '-__v' },
        {
          path: 'productColors',
          populate: [{ path: 'color' }, { path: 'productSizes', populate: 'size' }]
        }
      ])
      .sort({ createdAt: -1 })
      .lean();

      return products.filter((product) => {
        const hasProductColors = product.productColors && product.productColors.length > 0;

        const allProductSizesHaveValue =
          hasProductColors &&
          product.productColors.every(
            (color) =>
              color.productSizes &&
              color.productSizes.length > 0 &&
              color.productSizes.every((size) => size.size.sizeNumber !== undefined)
          );

        return hasProductColors && allProductSizesHaveValue;
      });
  }

  findBestSellingProducts = async () => {
    const orders = OrderProducts.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'order',
          foreignField: '_id',
          as: 'order_info'
        }
      },
      {
        $match: {
          'order_info.finishCart': true,
          'order_info.status_delivery': { $in: ['delivered', 'not_delivered'] }
        }
      },
      {
        $group: {
          _id: '$product',
          totalOrders: { $sum: '$count' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product_info'
        }
      },
      {
        $unwind: '$product_info'
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'product_info.brand',
          foreignField: '_id',
          as: 'brand_info'
        }
      },
      {
        $lookup: {
          from: 'usages',
          localField: 'product_info.usage',
          foreignField: '_id',
          as: 'usage_info'
        }
      },
      {
        $project: {
          _id: '$product_info._id',
          name: '$product_info.name',
          nameEng: '$product_info.nameEng',
          image: '$product_info.image',
          slug: '$product_info.slug',
          desc: '$product_info.desc',
          brand: {
            _id: { $arrayElemAt: ['$brand_info._id', 0] },
            name: { $arrayElemAt: ['$brand_info.name', 0] },
            nameEng: { $arrayElemAt: ['$brand_info.nameEng', 0] },
            image: { $arrayElemAt: ['$brand_info.image', 0] },
            slug: { $arrayElemAt: ['$brand_info.slug', 0] },
            desc: { $arrayElemAt: ['$brand_info.desc', 0] }
          },
          usage: {
            _id: { $arrayElemAt: ['$usage_info._id', 0] },
            name: { $arrayElemAt: ['$usage_info.name', 0] },
            nameEng: { $arrayElemAt: ['$usage_info.nameEng', 0] },
            slug: { $arrayElemAt: ['$usage_info.slug', 0] },
            icon: { $arrayElemAt: ['$usage_info.icon', 0] }
          },
          createdAt: '$product_info.createdAt',
          totalOrders: 1
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 }
    ]);

    return orders;
  };
})();
