const { check } = require('express-validator');
const baseVildator = require('./BaseValidations/baseVildator');

module.exports = new (class extends baseVildator {
  productValidator(isUpdate) {
    const validationRules = this.commonValidationRules();

    validationRules.push(
      check('desc')
        .not()
        .isEmpty()
        .withMessage('فیلد توضیحات وارد نشده')
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('فیلد توضیحات باید حداقل 2 حرف و حداکثر 200 حرف باشد'),
      check('brandId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی برند وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Brand');
        }),
      check('usageId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی کاربرد وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, 'Usage');
        })
    );

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی محصول وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Product');
          })
      );
    }

    return validationRules;
  }

  brandValidator(isUpdate) {
    const validationRules = this.commonValidationRules();

    validationRules.push(
      check('desc')
        .not()
        .isEmpty()
        .withMessage('فیلد توضیحات وارد نشده')
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('فیلد توضیحات باید حداقل 2 حرف و حداکثر 200 حرف باشد')
    );

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی برند وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Brand');
          })
      );
    }

    return validationRules;
  }

  colorValidator(isUpdate) {
    const validationRules = this.commonValidationRules();

    validationRules.push(check('color').not().isEmpty().withMessage('فیلد رنگ وارد نشده است'));

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی رنگ وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Color');
          })
      );
    }

    return validationRules;
  }

  usageValidator(isUpdate) {
    const validationRules = this.commonValidationRules();

    validationRules.push(check('icon').not().isEmpty().withMessage('فیلد آیکن وارد نشده').trim());

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی کاربرد وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Usage');
          })
      );
    }

    return validationRules;
  }

  sizeValidator(isUpdate) {
    const validationRules = [
      check('sizeNumber')
        .not()
        .isEmpty()
        .withMessage('فیلد سایز وارد نشده است')
        .isNumeric()
        .withMessage('فیلد سایز باید عددی باشد')
        .isInt({ min: 32, max: 46 })
        .withMessage('فیلد سایز باید بین 32 و 46 باشد')
    ];

    if (isUpdate === true) {
      validationRules.push(
        check('_id')
          .not()
          .isEmpty()
          .withMessage('آی‌دی سایز وارد نشده است')
          .custom(async (value) => {
            await this.validateId(value, 'Size');
          })
      );
    }

    return validationRules;
  }
})();
