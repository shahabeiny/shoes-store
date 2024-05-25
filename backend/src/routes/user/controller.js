const controller = require('./../controller');
const Role = require('../../models/role');
const LoginInfo = require('../../models/loginInfo');

module.exports = new (class extends controller {
  async getUsers(req, res) {
    const query = req.query.activeTab;
    let seachUser = {};

    if (query === 'nonbanned') {
      seachUser = { is_banned: false };
    } else if (query === 'banned') {
      seachUser = { is_banned: true };
    } else if (query === 'inactive') {
      seachUser = { is_active: false };
    }

    const users = await this.fetchUsers(seachUser);
    const roles = await this.findRoles();

    return this.response({
      res,
      message: 'لیست کاربران ',
      data: { users, roles }
    });
  }

  async editUser(req, res) {
    let { _id, name, family, username, email, mobile, address, role } = req.body;

    let editValues = { name, family, username, email, mobile, address, role };

    if (await this.checkExist(res, username, email, mobile, 409, 'این کاربر قبلا ثبت شده است', _id)) {
      return;
    }

    const hasImage = req.files && req.files.avatar;
    if (hasImage) {
      editValues.avatar = await this.upload(req.files.avatar, 'image', res);
    }
    return this.response({
      res,
      message: `کاربر ${username} با موفقیت ویرایش شد`,
      data: await this.updateUser(_id, editValues)
    });
  }

  async editProfile(req, res) {
    let { name, family, username, address } = req.body;

    let editValues = { name, family, username, address };

    if (await this.checkExist(res, username, '', '', 409, 'این کاربر قبلا ثبت شده است', req.user._id)) {
      return;
    }

    const hasImage = req.files && req.files.avatar;
    if (hasImage) {
      editValues.avatar = await this.upload(req.files.avatar, 'image', res);
    }

    return this.response({
      res,
      message: `کاربر ${username} با موفقیت ویرایش شد`,
      data: await this.updateUser(req.user._id, editValues)
    });
  }

  async editPassword(req, res) {
    let { mobile, password } = req.body;
    console.log(req.body)
    let findUser = await this.User.findOneAndUpdate(
      { mobile },
      { password: await this.hashPassword(password) }
    );
    this.response({
      res,
      message: 'رمز با موفقیت ویرایش شد'
    });
  }

  async bannUser(req, res) {
    let { _id, is_banned } = req.body;
    console.log(req.body)
    await this.User.updateOne({ _id }, { is_banned });
    return this.response({
      res,
      message: ` کاربر موردنظر با موفقیت ${is_banned ? 'حذف' : 'بازگردانی'} شد`,
      data: { _id, is_banned }
    });
  }

  async deleteUser(req, res) {
    const _id = req.params.id;

    await this.User.deleteOne({ _id });
    return this.response({
      res,
      message: ` کاربر موردنظر با موفقیت حذف شد`,
      data: _id 
    });
  }

  async loginInfo(req, res) {
    const info = await LoginInfo.find({ user: req.user._id }).select('-__v').sort({ createdAt: -1 });
    return this.response({
      res,
      message: `اطلاعات ورود کاربر`,
      data: info
    });
  }

  async me(req, res) {
    let infoUser = await this.User.findOne({ _id: req.user._id }).populate({
      path: 'role',
      select: '-__v',
      populate: {
        path: 'permissions',
        select: '-__v'
      }
    });
    this.response({
      res,
      message: 'با موفقیت وارد شدید',
      data: infoUser
    });
  }

  //////////////////////// helpers

  async fetchUsers(query) {
    return this.User.find(query)
      .populate({
        path: 'role',
        select: '_id name nameEng permissions',
        populate: {
          path: 'permissions',
          select: 'name nameEng'
        }
      })
      .select('-__v -password -otp')
      .sort({ createdAt: -1 });
  }

  async findRoles() {
    return Role.find({})
      .select('_id name nameEng permissions')
      .populate({
        path: 'permissions',
        select: 'name nameEng'
      })
      .sort({ createdAt: -1 });
  }

  async updateUser(_id, editValues) {
    return await this.User.findByIdAndUpdate(_id, editValues, {
      new: true
    })
      .populate({
        path: 'role',
        select: '-__v',
        populate: {
          path: 'permissions',
          select: '-__v'
        }
      })
      .select('-__v -password -otp');
  }

  async checkExist(res, username, email, mobile, code, message, _id = '') {
    const query = { username, email, mobile };

    if (_id) {
      query._id = { $ne: _id };
    }

    if (await this.User.exists(query)) {
      this.response({ res, code, message });
      return true;
    }
    return false;
  }
})();
