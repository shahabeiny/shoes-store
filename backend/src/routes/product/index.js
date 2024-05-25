const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/productValidator');
const  validate  = require('../../middlewares/validate');
const trimBody = require('../../middlewares/trimBody');
const { isLoggined, hasPermission } = require('../../middlewares/auth');

router
  .route('/product')
  .get(controller.getProducts)
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productValidator(false),
    validate,
    trimBody,
    controller.saveProduct
  )
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.productValidator(true),
    validate,
    trimBody,
    controller.editProduct
  );

module.exports = router;
