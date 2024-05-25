const { param, check } = require('express-validator');
const mongoose = require('mongoose');
const { namePersionRegex, nameEnglishRegex } = require('./RegexValid');
const modelMap = {
  User: require('../../models/user'),
  Role: require('../../models/role'),
  Brand: require('../../models/brand'),
  Color: require('../../models/color'),
  Size: require('../../models/size'),
  Usage: require('../../models/usage'),
  Product: require('../../models/product'),
  Permission: require('../../models/permission'),
  ProductColor: require('../../models/productColor')
};

module.exports = class {
  paramIdValidator() {
    return param('id').isMongoId().withMessage('آیدی وارد شده معتبر نمی‌باشد');
  }

  commonValidationRules() {
    return [
      check('name')
        .not()
        .isEmpty()
        .withMessage('فیلد اسم وارد نشده')
        .trim()
        .isLength({ min: 2, max: 15 })
        .withMessage('فیلد اسم باید حداقل 2 حرف و حداکثر 15 حرف باشد')
        .matches(namePersionRegex)
        .withMessage('فیلد اسم باید فارسی باشد'),
      check('nameEng')
        .not()
        .isEmpty()
        .withMessage('فیلد اسم انگلیسی وارد نشده')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('فیلد اسم انگلیسی باید حداقل 2 حرف و حداکثر 20 حرف باشد')
        .matches(nameEnglishRegex)
        .withMessage('فیلد اسم انگلیسی باید انگلیسی باشد')
    ];
  }

  async validateId(value, modelName) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`آی‌دی ${modelName} معتبر نیست`);
    }
    const Model = modelMap[modelName];
    const instance = await Model.findById(value);
    if (!Model) {
      throw new Error(`مدل ${modelName} یافت نشد`);
    }
    if (!instance) {
      throw new Error(`${modelName} با این آی‌دی وجود ندارد`);
    }
  }

  async validatePermissionIds(value) {
    if (!Array.isArray(value)) {
      throw new Error(`permissions باید یک آرایه باشد`);
    }

    if (value.length === 0) {
      return; // آرایه خالی است، بدون اعتبارسنجی
    }

    const invalidIds = value.filter((_id) => !mongoose.Types.ObjectId.isValid(_id));
    if (invalidIds.length > 0) {
      throw new Error(`یک یا چند آی‌دی داخل آرایه permissions معتبر نیستند: ${invalidIds.join(', ')}`);
    }

    const Model = modelMap['Permission'];
    const instances = await Model.find({ _id: { $in: value } });
    const existingIds = instances.map((instance) => instance._id.toString());
    const missingIds = value.filter((_id) => !existingIds.includes(_id));

    if (missingIds.length > 0) {
      throw new Error(`یک یا چند آی‌دی داخل آرایه permissions یافت نشدند: ${missingIds.join(', ')}`);
    }
  }
};
