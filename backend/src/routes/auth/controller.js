const controller = require('./../controller');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const Role = require('../../models/role');
const Permission = require('../../models/permission');
const senderSmS = require('../../../startup/sms');

module.exports = new (class extends controller {
  async register(req, res) {
    const { email, mobile, username, password } = req.body;

    let result = { msg: '', code: 201 };

    let searchUsers = await this.User.find({ $or: [{ email }, { mobile }, { username }] });

    if (searchUsers.length > 0) {
      for (let user of searchUsers) {
        if (user.is_active) {
          // جستجوی کاربر  فعال
          let errors = this.checkErrorRegister(user, email, mobile, username);
          if (errors.length > 0) {
            result.msg =
              errors.length > 0 ? errors.map((error, index) => ` ${index + 1} : ${error}  `).join('\n') : '';
            result.code = 400;
          }
        } else {
          // جستجوی کاربر غیر فعال
          if (user.email === email && user.mobile === mobile && user.username === username) {
            result = await this.operationOtp(user);
          } else {
            let errors = this.checkErrorRegister(user, email, mobile, username);
            if (errors.length > 0) {
              result.msg =
                errors.length > 0
                  ? errors.map((error, index) => ` ${index + 1} : ${error}  `).join('\n')
                  : '';
              result.code = 400;
            }
          }
        }
      }
    } else {
      let checkSms = await this.setTimeOtpWithCodeSms(3, mobile);
      if (checkSms.error) {
        result.msg = 'خطا در سرویس ارسال پیامک';
        result.code = 400;
      } else {
        await this.createUser(email, mobile, username, password, {
          code: checkSms.code,
          date: checkSms.date
        });

        result.msg = 'کاربر جدید با موفقیت ایجاد شد';
        result.code = 201;
      }
    }

    this.response({
      res,
      message: result.msg,
      code: result.code
    });
  }

  async otpVerify(req, res) {
    let { mobile, code } = req.body;

    let user = await this.findUserWithDetails({ mobile });
    if (code === user.otp.code) {
      if (this.checkExpirationOtp(user.otp.date)) {
        return this.response({
          res,
          code: 410,
          message: 'کد منقضی شده است'
        });
      } else {
        user.is_active = true;
        user.save();
        await this.saveLoginInfo(req, user._id);
        this.response({
          res,
          message: 'با موفقیت وارد شدید',
          data: {
            user,
            token: jwt.sign({ _id: user._id }, config.get('jwt_key'))
          }
        });
      }
    } else {
      return this.response({
        res,
        code: 400,
        message: 'کد وارد شده اشتباه است'
      });
    }
  }

  async changePass(req, res) {
    let { mobile, password } = req.body;
    let findUser = await this.User.findOneAndUpdate(
      { mobile },
      { password: await this.hashPassword(password) }
    );
    this.response({
      res,
      message: 'رمز با موفقیت ویرایش شد'
    });
  }

  async otpRestore(req, res) {
    let { mobile } = req.body;
    let result = { msg: '', code: 200 };

    let findUser = await this.User.findOne({ mobile });

    if (findUser) {
      result = await this.operationOtp(findUser);
    } else {
      result.msg = 'چنین کاربری وجود ندارد';
      result.code = 404;
    }
    this.response({
      res,
      message: result.msg,
      code: result.code
    });
  }

  async login(req, res) {
    let { email_or_phone, password } = req.body;
    const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let kind = emailRegexp.test(email_or_phone)
      ? { name: 'ایمیل', nameEng: 'email' }
      : { name: 'موبایل', nameEng: 'mobile' };

    let user = await this.findUserWithDetails({
      [kind.nameEng]: email_or_phone,
      is_active: true
    });

    if (!user) {
      return this.response({
        res,
        code: 401,
        message: 'کاربری با این مشخصات یافت نشد'
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: `${kind.name} یا رمزعبور اشتباه است `
      });
    }
    await this.saveLoginInfo(req, user._id);
    this.response({
      res,
      message: 'با موفقیت وارد شدید',
      data: {
        user,
        token: jwt.sign({ _id: user._id }, config.get('jwt_key'))
      }
    });
  }

  async forget(req, res) {
    let { mobile } = req.body;

    let result = { msg: '', code: 200 };

    let findUser = await this.User.findOne({ mobile, is_active: true });
    if (findUser) {
      result = await this.operationOtp(findUser);
    } else {
      result.msg = 'چنین کاربری وجود ندارد';
      result.code = 404;
    }
    this.response({
      res,
      message: result.msg,
      code: result.code
    });
  }

  ///////////////////// helper methods

  checkErrorRegister(user, email, mobile, username) {
    const errors = [];
    if (user.email === email) errors.push(' ایمیل قبلا ثبت شده است');
    if (user.mobile === mobile) errors.push(' شماره موبایل قبلا ثبت شده است');
    if (user.username === username) errors.push(' نام کاربری قبلا ثبت شده است');
    return errors;
  }

  async updateOtpUser(mobile, query) {
    await this.User.findOneAndUpdate({ mobile }, query, { new: true });
  }

  async createAdminRole() {
    const countUser = await this.User.find({});

    let newRole = {};
    if (countUser.length > 0) {
      let checkRoleUser = await Role.findOne({ nameEng: 'USER' });
      if (checkRoleUser) {
        newRole = checkRoleUser._id;
      } else {
        newRole = await Role.create({
          name: 'کاربر',
          nameEng: 'USER',
          permissions: []
        });
      }
    } else {
      let checkRoleAdmin = await Role.findOne({ nameEng: 'ADMIN' });
      if (checkRoleAdmin) {
        newRole = checkRoleAdmin._id;
      } else {
        newRole = await Role.create({
          name: 'ادمین',
          nameEng: 'ADMIN',
          permissions: await this.createPermissions()
        });
      }
    }
    return newRole._id;
  }

  async createPermissions() {
    const array = [
      { name: 'تغییرات کاربران', nameEng: 'EDIT_USERS' },
      { name: 'نمایش کاربران', nameEng: 'SHOW_USERS' },
      { name: 'افزودن نقش', nameEng: 'EDIT_ROLES' },
      { name: 'نمایش نقش', nameEng: 'SHOW_ROLES' },
      { name: 'تغییرات محصولات', nameEng: 'EDIT_PRODUCTS' },
      { name: 'نمایش محصولات', nameEng: 'SHOW_PRODUCTS' },
      { name: 'ویرایش سفارشات', nameEng: 'EDIT_ORDERS' },
      { name: 'نمایش همه سفارشات', nameEng: 'SHOW_ORDERS' }
    ];
    const docs = await Permission.insertMany(array);
    return docs.map((d) => d._id);
  }

  async createUser(email, mobile, username, password, otp) {
    let user = await this.User.create({
      email,
      mobile,
      username,
      password: await this.hashPassword(password),
      role: await this.createAdminRole(),
      otp
    });

    return await user.populate({
      path: 'role',
      populate: {
        path: 'permissions',
        select: '-__v'
      }
    });
  }

  async findUserWithDetails(query) {
    return await this.User.findOne(query).populate({
      path: 'role',
      select: '-__v',
      populate: {
        path: 'permissions',
        select: '-__v'
      }
    });
  }

  setTimeOtpWithCodeSms = async (time, mobile) => {
    let error = false;
    let code = '';
    const date = new Date();
    let resultSms = await senderSmS(mobile);
    if (resultSms.hasOwnProperty('code')) {
      code = resultSms.code;
    } else {
      error = true;
    }
    return {
      code,
      error,
      date: date.setMinutes(date.getMinutes() + time)
    };
  };

  checkExpirationOtp(otpDate) {
    let resendOtp = false;
    if (new Date() > otpDate) resendOtp = true;
    else resendOtp = false;

    return resendOtp;
  }

  async operationOtp(user) {
    let result = { msg: '', code: 200 };
    if (this.checkExpirationOtp(user.otp.date)) {
      let checkSms = await this.setTimeOtpWithCodeSms(3, user.mobile);
      if (checkSms.error) {
        result.msg = 'خطا در سرویس ارسال پیامک';
        result.code = 400;
      } else {
        await this.updateOtpUser(user.mobile, {
          otp: {
            code: checkSms.code,
            date: checkSms.date
          }
        });
        result.msg = `کد جدید ارسال شد`;
        result.code = 200;
      }
    } else {
      result.msg = `تا ارسال کد جدید باید ${this.subTimeOtp(user.otp.date)} دقیقه صبر کنید`;
      result.code = 400;
    }
    return result;
  }

  subTimeOtp(otpDate) {
    const targetDate = new Date(otpDate);
    const currentDate = new Date();

    // محاسبه تفاوت زمانی به میلی‌ثانیه
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    // تبدیل میلی‌ثانیه به دقیقه و گرد کردن به عدد صحیح
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    return minutesDifference;
  }
})();
