const controller = require('./../controller');
const Color = require('../../models/color');
const ProductColor = require('../../models/productColor');

module.exports = new (class extends controller {
  async saveColor(req, res) {
    let { name, nameEng, color } = req.body;

    if (await this.checkExist(res, name, color, 409)) {
      return;
    }

    const newColor = await Color.create({ name, nameEng, color });
    this.response({ res, code: 201, message: 'رنگ جدید با موفقیت ذخیره شد', data: newColor });
  }

  async getColors(req, res) {
    const colors = await Color.find({}).sort({ createdAt: -1 }).select('-__v');
    this.response({
      res,
      message: ' لیست رنگ ها ',
      data: colors
    });
  }

  async editColor(req, res) {
    let { name, nameEng, color, _id } = req.body;

    if (await this.checkExist(res, name, color, 409, _id)) {
      return;
    }

    const updatedColor = await Color.findByIdAndUpdate(_id, { name, nameEng, color }, { new: true }).select(
      '-__v'
    );
    return this.response({
      res,
      message: 'رنگ با موفقیت ویرایش شد',
      data: updatedColor
    });
  }

  async deleteColor(req, res) {
    let _id = req.params.id;

    if (await ProductColor.exists({ color: _id })) {
      return this.response({
        res,
        code: 409,
        message: 'این رنگ استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

    await Color.deleteOne({_id}).select('-__v');
    return this.response({
      res,
      message: 'رنگ با موفقیت حذف شد',
       data: _id 
    });
  }

  async checkExist(res, name, color, code, _id = '') {
    const query = { $or: [{ name }, { color }] };

    if (_id) {
      query._id = { $ne: _id };
    }

    let findColor = await Color.findOne(query);

    if (findColor) {
      let msg = '';
      if (findColor.name === name) msg = ' نام رنگ تکراری است';
      if (findColor.color === color) msg = 'کد رنگ تکراری است';
      this.response({ res, code, message: msg });
      return true;
    }
    return false;
  }
})();
