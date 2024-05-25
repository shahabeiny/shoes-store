const express = require('express');
const router = express.Router();
const validator = require('../../validation/productKindValidations');
const validate = require('../../middlewares/validate');
const controller = require('./controller');
const { isLoggined, isLogginedOptional, hasPermission } = require('../../middlewares/auth');

router.get('/productkind/all/:slug', isLoggined, controller.getKindProducts);
router.get('/productkind/all/shop/:slug', isLogginedOptional, controller.getShopKindProducts);

router
  .route('/productkind/color')
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productColorValidator(false),
    validate,
    controller.saveProductColor
  )
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productColorValidator(true),
    validate,
    controller.editProductColor
  );

router
  .route('/productkind/size')
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productSizeValidator(false),
    validate,
    controller.addProductSize
  )
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productSizeValidator(true),
    validate,
    controller.editProductSize
  );

module.exports = router;
