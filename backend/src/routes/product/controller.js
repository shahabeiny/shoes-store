const controller = require('./../controller');
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Usage = require('../../models/usage');
const Slide = require('../../models/slide');

module.exports = new (class extends controller {
  async saveProduct(req, res) {
    let { name, nameEng, brandId, usageId, desc } = req.body;

    if (await this.checkExist(res, name, brandId, usageId, 409, 'این محصول قبلا ثبت شده است')) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (!hasImage) {
      return this.response({ res, code: 400, message: 'no file uploaded' });
    }
    const image = await this.upload(req.files.image, 'image', res);

    let newProduct = await Product.create({
      image,
      name,
      nameEng,
      desc,
      brand: brandId,
      usage: usageId,
      slug: this.slug(name)
    });

    newProduct = await newProduct.populate([
      { path: 'brand', select: '-__v' },
      { path: 'usage', select: '-__v' },
      { path: 'productColors', select: '-__v' }
    ]);

    return this.response({
      res,
      code: 201,
      message: 'محصول جدید با موفقیت ذخیره شد',
      data: { ...newProduct.toJSON(),rates:0, colors: [] }
    });
  }

  async editProduct(req, res) {
    let { name, nameEng, desc, brandId, usageId, _id } = req.body;

    let editValues = {
      name,
      nameEng,
      desc,
      brand: brandId,
      usage: usageId,
      slug: this.slug(name)
    };

    if (await this.checkExist(res, name, brandId, usageId, 409, 'این محصول قبلا ثبت شده است', _id)) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (hasImage) {
      editValues.image = await this.upload(req.files.image, 'image', res);
    }

    const productUpdated = await Product.findByIdAndUpdate(_id, editValues, {
      new: true
    })
      .populate([
        { path: 'brand', select: '-__v' },
        { path: 'usage', select: '-__v' }
      ])
      .sort({ createdAt: -1 })
      .select('-__v');

    return this.response({ res, message: 'محصول با موفقیت ویرایش شد', data: productUpdated });
  }

  async getProducts(req, res) {
    let data = {};
    let queryStr = req.query;

    if (queryStr.is_panel && queryStr.is_panel === 'true') {
      data.brands = await Brand.find({}).sort({ createdAt: -1 }).select('-__v');
      data.usages = await Usage.find({}).sort({ createdAt: -1 }).select('-__v');
    }
    data.products = await this.getListProducts(queryStr);

    this.response({ res, message: ' لیست محصولات ', data });
  }

  //////////////////////////////////// help method

  async getListProducts(query) {
    let findQuery = {};

    if (query.name) {
      findQuery['name'] = new RegExp('.*' + query.name + '.*');
    }

    if (query.brand) {
      const brand = await this.findBrand(query.brand);
      if (!brand) {
        return [];
      }
      findQuery['brand'] = brand._id;
    }

    if (query.usage) {
      const usage = await this.findUsage(query.usage);
      if (!usage) {
        return [];
      }
      findQuery['usage'] = usage._id;
    }

    let getProducts = await Product.find(findQuery)
      .populate([
        { path: 'brand', select: '-__v' },
        { path: 'usage', select: '-__v' },
        { path: 'rates', select: '-__v' },
        {
          path: 'productColors',
          populate: [{ path: 'color' }, { path: 'productSizes', populate: 'size' }]
        }
      ])
      .sort({ createdAt: -1 })
      .lean();

    if (query.is_slide && query.is_slide === 'false') {
      const slideProducts = await Slide.find({}).lean();
      const slideProductIds = slideProducts.map((slide) => slide.product);

      getProducts = getProducts.filter((product) => {
        return !slideProductIds.some((id) => id.equals(product._id));
      });
    }

    getProducts = await this.filterProductsBySize(getProducts, query.size);
    getProducts = await this.filterProductsByColor(getProducts, query.color);
    getProducts = await this.filterProductsByPanel(getProducts, query.is_panel);

    getProducts.forEach((product) => {
      product.rates = this.calculateRate(product.rates);
    });

    return getProducts;
  }

  async findBrand(queryBrand) {
    return await Brand.findOne({ slug: queryBrand });
  }

  async findUsage(queryUsage) {
    return await Usage.findOne({ slug: queryUsage });
  }

  async filterProductsBySize(products, querySize) {
    if (!querySize) {
      return products;
    }
    return products.filter((product) =>
      product.productColors.some((color) =>
        color.productSizes.some((size) => size.size.sizeNumber === parseInt(querySize))
      )
    );
  }

  async filterProductsByColor(products, queryColor) {
    if (!queryColor) {
      return products;
    }
    return products.filter((product) =>
      product.productColors.some((color) => color.color._id.equals(queryColor))
    );
  }

  async filterProductsByPanel(products, queryIsPanel) {
    if (queryIsPanel && queryIsPanel === 'false') {
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
    return products;
  }

  async checkExist(res, name, brandId, usageId, code, message, _id = '') {
    // const query = { name, brand: brandId, usage: usageId };
    const query = { name, $or: [{ brand: brandId }, { usage: usageId }] };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (!!(await Product.findOne(query))) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }

  
})();
