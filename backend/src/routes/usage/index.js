const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/productValidator');
const { isLoggined, hasPermission } = require('../../middlewares/auth');
const  validate  = require('../../middlewares/validate');
const trimBody = require('../../middlewares/trimBody');

router
  .route('/usage')
  .get(controller.getUsages)
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.usageValidator(false),
    validate,
    trimBody,
    controller.saveUsage
  )
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.usageValidator(true),
    validate,
    trimBody,
    controller.editUsage
  );

router.delete(
  '/usage/:id',
  isLoggined,
  hasPermission(['EDIT_PRODUCTS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteUsage
);

module.exports = router;
