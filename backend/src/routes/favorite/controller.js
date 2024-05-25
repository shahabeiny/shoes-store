const controller = require('./../controller');
const Rate = require('../../models/rate');
const Product = require('../../models/product');
const Favorite = require('../../models/favorite');

module.exports = new (class extends controller {
  async saveFavorite(req, res) {
    let user = req.user._id;
    let { productId } = req.body;
    

    if (
      await this.checkExistFavorite(res, productId, user, 409, 'این محصول در علاقه مندی ها قبلا ثبت شده است')
    ) {
      return;
    }

    let saveNewFavorite = await Favorite.create({
      product: productId,
      user
    });
    return this.response({
      res,
      code: 201,
      message: 'محصول به لیست علاقه مندی ها افزوده شد',
      data: await saveNewFavorite.populate({
        path: 'product',
        select: '_id name nameEng image desc slug'
      })
    });
  }

  async getFavorites(req, res) {
    let data = [];
    const favoriteProducts = await Favorite.find({ user: req.user._id });

    if (favoriteProducts.length !== 0) {
      const productsArray = favoriteProducts.map((favorite) => favorite.product);
      const query = { _id: { $in: productsArray } };
      data = await this.getListFavorites(query);
    }

    return this.response({
      res,
      message: `لیست علاقه مندی ها `,
      data
    });
  }

  async deleteFavorite(req, res) {
    let findFavorite = await Favorite.findOneAndDelete({
      product: req.params.id,
      user: req.user._id
    }).populate({
      path: 'product',
      select: '_id name nameEng image desc slug'
    });

    return this.response({
      res,
      message: 'با موفقیت حذف شد',
      data: findFavorite.product
    });
  }

  async saveRate(req, res) {
    let user = req.user._id;
    let { productId, rate } = req.body;

    if (await this.checkExistRate(res, productId, user, 409, 'شما قبلا به این محصول امتیاز داده اید')) {
      return;
    }

    let saveRate = await Rate.create({
      rate,
      user,
      product: productId
    });

    return this.response({
      res,
      code: 201,
      message: 'امتیاز شما با موفقیت ثبت شد',
      data: saveRate.rate
    });
  }

  async getListFavorites(query) {
    let getProducts = await Product.find(query)
      .populate([
        { path: 'brand', select: '-__v' },
        { path: 'usage', select: '-__v' },
        { path: 'rates', select: '-__v' },
        { path: 'productColors', populate: [{ path: 'color' }, { path: 'productSizes', populate: 'size' }] }
      ])
      .lean();
    getProducts.forEach((product) => {
      product.rates = this.calculateRate(product.rates);
    });
    return getProducts;
  }

  async checkExistRate(res, product, user, code, message) {
    if (await Rate.exists({ product, user })) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }

  async checkExistFavorite(res, product, user, code, message) {
    if (await Favorite.exists({ product, user })) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
})();
