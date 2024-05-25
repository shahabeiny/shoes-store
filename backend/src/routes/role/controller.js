const controller = require('./../controller');
const Role = require('../../models/role');
const Permission = require('../../models/permission');

module.exports = new (class extends controller {
  async getRoles(req, res) {
    const roles = await Role.find({})
      .select('_id name nameEng permissions')
      .populate({ path: 'permissions', select: '-__v' })
      .sort({ createdAt: -1 });

    const permissions = await Permission.find({}).sort({ createdAt: -1 }).select('-__v');

    return this.response({ res, message: ' لیست نقش ها ', data: { permissions, roles } });
  }

  async addRole(req, res) {
    let { name, nameEng, permissions } = req.body;

    if (await this.checkExist(res, name, 409, 'این نقش قبلا ثبت شده است')) {
      return;
    }
    
    let newRrole = await Role.create({ name, nameEng, permissions });
    newRrole = await newRrole.populate({ path: 'permissions', select: '-__v' });
    
    return this.response({
      res,
      code: 201,
      message: 'نقش جدید با موفقیت ذخیره شد',
      data: newRrole
    });
  }

  async editRole(req, res) {
    let { _id, name, nameEng, permissions } = req.body;

    if (await this.checkExist(res, name, 409, 'این نقش قبلا ثبت شده است', _id)) {
      return;
    }

    const updatedRole = await Role.findByIdAndUpdate(_id, { name, nameEng, permissions }, { new: true })
      .select('_id name nameEng permissions')
      .populate({ path: 'permissions', select: '-__v' });

    return this.response({
      res,
      message: 'نقش با موفقیت ویرایش شد',
      data: updatedRole
    });
  }

  async deleteRole(req, res) {
    let _id = req.params.id;

    if (await this.User.exists({ role: _id })) {
      return this.response({
        res,
        code: 409,
        message: 'این نقش استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

    await Role.deleteOne({ _id });

    return this.response({
      res,
      message: 'نقش با موفقیت حذف شد',
      data: _id 
    });
  }

  async checkExist(res, name, code, message, _id = '') {
    const query = { name };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (await Role.exists(query)) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
})();
