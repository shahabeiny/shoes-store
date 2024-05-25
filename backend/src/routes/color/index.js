const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/productValidator');
const validate = require('../../middlewares/validate');
const trimBody = require('../../middlewares/trimBody');
const { hasPermission } = require('../../middlewares/auth');

router
  .route('/color')
  .get(hasPermission(['SHOW_PRODUCTS']), controller.getColors)
  .post(
    hasPermission(['EDIT_PRODUCTS']),
    validator.colorValidator(false),
    validate,
    trimBody,
    controller.saveColor
  )
  .put(
    hasPermission(['EDIT_PRODUCTS']),
    validator.colorValidator(true),
    validate,
    trimBody,
    controller.editColor
  );

router.delete(
  '/color/:id',
  hasPermission(['EDIT_PRODUCTS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteColor
);

module.exports = router;
