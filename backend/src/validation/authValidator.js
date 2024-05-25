const { check, oneOf } = require('express-validator');
const { mobileRegex } = require('./BaseValidations/RegexValid');

module.exports = new (class {
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

  forgetValidator() {
    return [check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است')];
  }

  changePassValidator() {
    return [
      check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است'),
      check('password').not().isEmpty().withMessage('فیلد رمزعبور خالی است')
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

  otpRestoreValidator() {
    return [check('mobile').matches(mobileRegex).withMessage('فیلد شماره موبایل نامعتبر است')];
  }
})();
