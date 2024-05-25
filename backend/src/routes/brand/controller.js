const controller = require('./../controller');
const Brand = require('../../models/brand');
const Product = require('../../models/product');

class BrandController extends controller {
  async saveBrand(req, res) {
    const { name, nameEng, desc } = req.body;

    if (await this.checkExist(res, name, 409, 'این برند قبلا ثبت شده است')) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (!hasImage) {
      return this.response({ res, code: 400, message: 'no file uploaded' });
    }

    const image = await this.upload(req.files.image, 'image', res);
    const newBrand = await Brand.create({ image, name, nameEng, desc, slug: this.slug(name) });

    this.response({ res, code: 201, message: 'برند جدید با موفقیت ذخیره شد', data: newBrand });
  }

  async editBrand(req, res) {
    const { name, nameEng, desc, _id } = req.body;
    const editValues = { name, nameEng, desc, slug: this.slug(name) };

    if (await this.checkExist(res, name, 409, 'این برند قبلا ثبت شده است', _id)) {
      return;
    }

    const hasImage = req.files && req.files.image;
    if (hasImage) {
      editValues.image = await this.upload(req.files.image, 'image', res);
    }

    const updatedBrand = await Brand.findByIdAndUpdate(_id, editValues, {
      new: true
    }).select('-__v');

    this.response({ res, code: 200, message: 'برند با موفقیت ویرایش شد', data: updatedBrand });
  }

  async getBrands(req, res) {
    const brands = await Brand.find({}).sort({ createdAt: -1 }).select('-__v');

    this.response({ res, code: 200, message: 'لیست برندها', data: brands });
  }

  async deleteBrand(req, res) {
    const _id = req.params.id;

    if (await Product.exists({ brand: _id })) {
      return this.response({
        res,
        code: 409,
        message: 'این برند استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

   await Brand.deleteOne({_id}).select('-__v');
    return this.response({ res, code: 200, message: 'برند با موفقیت حذف شد', data:  _id  });
  }

  async checkExist(res, name, code, message, _id = '') {
    let query = { name };

    if (_id) {
      query._id = { $ne: _id };
    }

    let findBrand = await Brand.findOne(query);

    if (findBrand) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
}

module.exports = new BrandController();
