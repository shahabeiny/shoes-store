const { check } = require('express-validator');
const baseVildator = require('./BaseValidations/baseVildator');

module.exports = new (class extends baseVildator {
 
  favoriteValidator() {
    return [
      check('productId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی محصول وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, "Product");
        })
    ];
  }

  rateValidator() {
    return [
      check('productId')
        .not()
        .isEmpty()
        .withMessage('آی‌دی محصول وارد نشده است')
        .custom(async (value) => {
          await this.validateId(value, "Product");
        }),
      check('rate')
        .not()
        .isEmpty()
        .withMessage('فیلد امتیاز وارد نشده است')
        .isNumeric()
        .withMessage('فیلد امتیاز باید عددی باشد')
        .isInt({ min: 1, max: 6 })
        .withMessage('فیلد امتیاز باید بین 1 و 6 باشد')
    ];
  }
})();
