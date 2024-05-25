const { check, oneOf } = require('express-validator');
const Role = require('../models/role');
const User = require('../models/user');
const baseVildator = require('./BaseValidations/baseVildator');
const { mobileRegex, namePersionRegex } = require('./BaseValidations/RegexValid');

module.exports = new (class extends baseVildator {
  editUserValidator() {
    return [
      check('email').isEmail().withMessage('فیلدایمیل نامعتبر است'),
      check('username')
        .not()
        .isEmpty()
        .trim()
        .withMessage('فیلد نام کاربری وارد نشده ')
        .isLength({ min: 2, max: 25 })
        .withMessage('فیلد نام کاربری باید حداقل 2 حرف و حداکثر 25 حرف باشد'),
      check('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 15 })
        .withMessage('فیلد اسم باید حداقل 2 حرف و حداکثر 15 حرف باشد')
        .matches(namePersionRegex)
        .withMessage('فیلد اسم باید فارسی باشد'),
      check('family')
        .optional()
        .trim()
        .isLength({ min: 2, max: 15 })
        .withMessage('فیلد فامیلی باید حداقل 2 حرف و حداکثر 15 حرف باشد')
        .matches(namePersionRegex)
        .withMessage('فیلد فامیلی باید فارسی باشد'),
      check('address')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('فیلد آدرس باید حداقل 2 حرف و حداکثر 200 حرف باشد'),
      check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است'),
      check('role')
        .not()
        .isEmpty()
        .withMessage('آی‌دی نقش وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Role');
        }),
      check('_id')
        .not()
        .isEmpty()
        .withMessage('آی‌دی کاربر وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'User');
        })
    ];
  }

  editProfileValidator() {
    return [
      check('username')
        .not()
        .isEmpty()
        .trim()
        .withMessage('فیلد نام کاربری وارد نشده ')
        .isLength({ min: 2, max: 25 })
        .withMessage('فیلد نام کاربری باید حداقل 2 حرف و حداکثر 25 حرف باشد'),
      check('name')
        .not()
        .isEmpty()
        .trim()
        .withMessage('فیلد اسم وارد نشده ')
        .isLength({ min: 2, max: 15 })
        .withMessage('فیلد اسم باید حداقل 2 حرف و حداکثر 15 حرف باشد')
        .matches(namePersionRegex)
        .withMessage('فیلد اسم باید فارسی باشد'),
      check('family')
        .not()
        .isEmpty()
        .trim()
        .withMessage('فیلد فامیلی وارد نشده ')
        .isLength({ min: 2, max: 15 })
        .withMessage('فیلد فامیلی باید حداقل 2 حرف و حداکثر 15 حرف باشد')
        .matches(namePersionRegex)
        .withMessage('فیلد فامیلی باید فارسی باشد'),
      check('address')
        .not()
        .isEmpty()
        .trim()
        .withMessage('فیلد آدرس وارد نشده ')
        .isLength({ min: 2, max: 200 })
        .withMessage('فیلد آدرس باید حداقل 2 حرف و حداکثر 200 حرف باشد')
    ];
  }

  registerValidator() {
    return [
      check('email').isEmail().withMessage('فیلدایمیل نامعتبر است'),
      check('username')
        .not()
        .isEmpty()
        .withMessage('فیلد نام کاربری وارد نشده ')
        .isLength({ min: 2, max: 25 })
        .withMessage('فیلد نام کاربری باید حداقل 2 حرف و حداکثر 25 حرف باشد'),
      check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است'),
      check('password').not().isEmpty().withMessage('فیلد رمزعبور وارد نشده')
    ];
  }

  loginValidator() {
    return [
      oneOf([
        check('email_or_phone').isEmail(),
        check('email_or_phone').not().isEmpty().isString().matches(mobileRegex)
      ]),
      check('password').not().isEmpty().withMessage('فیلد رمزعبور خالی است')
    ];
  }

  mobileValidator() {
    return [check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است')];
  }

  changePassValidator() {
    return [
      check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است'),
      check('password').not().isEmpty().withMessage('فیلد رمزعبور خالی است')
    ];
  }

  bannUserValidator() {
    return [
      check('_id')
        .not()
        .isEmpty()
        .withMessage('آی‌دی کاربر وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'User');
        }),
      check('is_banned')
        .not()
        .isEmpty()
        .withMessage('فیلد وارد نشده  ')
        .isBoolean()
        .withMessage('فیلد باید از نوع بولین باشد')
    ];
  }

  otpVerifyValidator() {
    return [
      check('code')
        .not()
        .isEmpty()
        .withMessage('فیلد کد تایید وارد نشده')
        .trim()
        .isLength({ min: 5, max: 5 })
        .withMessage('طول فیلد کد تایید باید 5 باشد'),
      check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است')
    ];
  }

  roleValidator(isUpdate) {
    const validationRules = this.commonValidationRules();

    validationRules.push(
      check('permissions').custom(async (value) => {
        await this.validatePermissionIds(value);
      })
    );

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی نقش وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Role');
          })
      );
    }

    return validationRules;
  }
})();
