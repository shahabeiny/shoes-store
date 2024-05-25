const controller = require('../controller');
const Slide = require('../../models/slide');
const Product = require('../../models/product');

module.exports = new (class extends controller {
  async saveSlide(req, res) {
    let { productId } = req.body;
    let saveNewSlide = await Slide.create({ product: productId });

    let detailNewSlide = (
      await saveNewSlide.populate({
        path: 'product',
        populate: [
          { path: 'brand', select: '-__v' },
          { path: 'usage', select: '-__v' },
          { path: 'rates', select: '-__v' },
          {
            path: 'productColors',
            populate: [{ path: 'color' }, { path: 'productSizes', populate: 'size' }]
          }
        ]
      })
    ).product;

    return this.response({
      res,
      code: 201,
      message: 'محصول به لیست اسلاید ها افزوده شد',
      data: { ...detailNewSlide.toJSON(), rates: this.calculateRate(detailNewSlide.rates) }
    });
  }

  async getSlides(req, res) {
    let data = [];
    const slideProducts = await Slide.find();

    if (slideProducts.length !== 0) {
      const productsArray = slideProducts.map((slide) => slide.product);
      const query = { _id: { $in: productsArray } };
      data = await this.getListSlides(query);
    }

    return this.response({
      res,
      message: `لیست اسلاید ها `,
      data
    });
  }

  async deleteSlide(req, res) {
    let _id = req.params.id;
   await Slide.deleteOne({ _id });

    return this.response({
      res,
      message: 'با موفقیت حذف شد',
     data: { _id }
    });
  }

  async getListSlides(query) {
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
})();
