const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/productValidator');
const validate = require('../../middlewares/validate');
const { isLoggined, hasPermission } = require('../../middlewares/auth');
const trimBody = require('../../middlewares/trimBody');

router
  .route('/brand')
  .get(controller.getBrands)
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.brandValidator(false),
    validate,
    trimBody,
    controller.saveBrand
  )
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.brandValidator(true),
    validate,
    trimBody,
    controller.editBrand
  );

router.delete(
  '/brand/:id',
  isLoggined,
  hasPermission(['EDIT_PRODUCTS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteBrand
);

module.exports = router;
