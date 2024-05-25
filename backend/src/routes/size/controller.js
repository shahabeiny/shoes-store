const controller = require('./../controller');
const Size = require('../../models/size');
const ProductSize = require('../../models/productSize');

module.exports = new (class extends controller {
  async saveSize(req, res) {
    let { sizeNumber } = req.body;
    console.log

    if (await this.checkExist(res, sizeNumber, 409, 'این سایز قبلا ثبت شده است')) {
      return;
    }

    const newSize = await Size.create({ sizeNumber });
    return this.response({
      res,
      code: 201,
      message: 'سایز جدید با موفقیت ذخیره شد',
      data: newSize
    });
  }

  async getSizes(req, res) {
    const sizes = await Size.find({}).select('-__v').sort({ createdAt: -1 });
    return this.response({ res, message: ' لیست سایز ها ', data: sizes });
  }

  async editSize(req, res) {
    let { sizeNumber, _id } = req.body;

    if (await this.checkExist(res, sizeNumber, 409, 'این سایز قبلا ثبت شده است', _id)) {
      return;
    }

    const sizeUpdated = await Size.findByIdAndUpdate(_id, { sizeNumber }, { new: true }).select('-__v');
    return this.response({ res, message: 'سایز با موفقیت ویرایش شد', data: sizeUpdated });
  }

  async deleteSize(req, res) {
    let _id = req.params.id;

    if (await ProductSize.exists({ size: _id })) {
      return this.response({
        res,
        code: 409,
        message: 'این سایز استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

    await Size.deleteOne({_id}).select('-__v');

    return this.response({
      res,
      message: 'سایز با موفقیت حذف شد',
      data: _id 
    });
  }

  async checkExist(res, sizeNumber, code, message, _id = '') {
    const query = { sizeNumber };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (!!(await Size.findOne(query))) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
})();
