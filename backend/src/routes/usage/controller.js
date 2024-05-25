const controller = require('../controller');
const Usage = require('../../models/usage');
const Product = require('../../models/product');

module.exports = new (class extends controller {
  async saveUsage(req, res) {
    let { name, nameEng, icon } = req.body;
    console.log(req.body)
    if (await this.checkExist(res, name, 409, 'این کاربرد قبلا ثبت شده است')) {
      return;
    }

    const newUsage = await Usage.create({
      icon,
      name,
      nameEng,
      slug: this.slug(name)
    });

    return this.response({
      res,
      code: 201,
      message: 'کاربرد جدید با موفقیت ذخیره شد',
      data: newUsage
    });
  }

  async editUsage(req, res) {
    let { name, nameEng, _id, icon } = req.body;

    const editValues = { name, nameEng, icon, slug: this.slug(name) };

    if (await this.checkExist(res, name, 409, 'این کاربرد قبلا ثبت شده است', _id)) {
      return;
    }

    const updatedUsage = await Usage.findByIdAndUpdate(_id, editValues, {
      new: true
    });

    return this.response({
      res,
      code: 200,
      message: 'کاربرد با موفقیت ویرایش شد',
      data: updatedUsage
    });
  }

  async getUsages(req, res) {
    const usages = await Usage.find({}).sort({ createdAt: -1 }).select('-__v');
    return this.response({ res, code: 200, message: 'لیست کاربردها', data: usages });
  }

  async deleteUsage(req, res) {
    const _id = req.params.id;

    if (await Product.exists({ usage: _id })) {
      return this.response({
        res,
        code: 409,
        message: 'این کاربرد استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }
    
    await Usage.deleteOne({ _id });
    return this.response({
      res,
      code: 200,
      message: 'کاربرد با موفقیت حذف شد',
      data: _id 
    });
  }

  async checkExist(res, name, code, message, _id = '') {
    const query = { name };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (await Usage.exists(query)) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
})();
