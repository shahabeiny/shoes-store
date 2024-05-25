const { check } = require('express-validator');
const baseVildator = require('./BaseValidations/baseVildator');

module.exports = new (class extends baseVildator {
  productColorValidator(isUpdate) {
    const validationRules = [
      check('productId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی محصول وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Product');
        }),
      check('colorId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی رنگ وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Color');
        })
    ];

    if (isUpdate === true) {
      validationRules.push(
        check('productColorId')
          .not()
          .isEmpty()
          .withMessage('آی‌دی رنگ محصول وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'ProductColor');
          })
      );
    }

    return validationRules;
  }

  productSizeValidator(isUpdate) {
    return [
      check('sizeId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی سایز وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Size');
        }),
      check('productColorId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی رنگ محصول وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'ProductColor');
        }),
      check('total')
        .not()
        .isEmpty()
        .withMessage('فیلد تعداد کل وارد نشده')
        .isNumeric()
        .withMessage('فیلد تعداد کل باید عددی باشد'),
      check('eachCart')
        .not()
        .isEmpty()
        .withMessage('فیلد تعداد سبد وارد نشده')
        .isNumeric()
        .withMessage('فیلد تعداد سبد باید عددی باشد')
        .custom((value, { req }) => {
          if (parseInt(value) > parseInt(req.body.total)) {
            throw new Error('تعداد سبد نمی‌تواند بیشتر از تعداد کل باشد');
          }
          return true;
        }),
      check('sold')
        .not()
        .isEmpty()
        .withMessage('فیلد تعداد فروخته شده وارد نشده')
        .isNumeric()
        .withMessage('فیلد تعداد فروخته شده باید عددی باشد'),
      check('frozen')
        .not()
        .isEmpty()
        .withMessage('فیلد تعداد یخ زده وارد نشده')
        .isNumeric()
        .withMessage('فیلد تعداد یخ زده باید عددی باشد')
        .custom((value, { req }) => {
          if (parseInt(value) > parseInt(req.body.total)) {
            throw new Error('تعداد یخ زده نمی‌تواند بیشتر از تعداد کل باشد');
          }
          return true;
        }),
      check('price')
        .not()
        .isEmpty()
        .withMessage('فیلد قیمت محصول وارد نشده')
        .isNumeric()
        .withMessage('فیلد قیمت محصول باید عددی باشد')
        .custom((value) => {
          if (parseInt(value) <= 0 || parseInt(value) >= 10000000) {
            throw new Error('قیمت محصول باید بیشتر از صفر و کمتر از ۱۰۰،۰۰۰،۰۰۰ باشد');
          }
          return true;
        })
    ];
  }
})();
