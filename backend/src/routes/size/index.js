const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/productValidator');
const validate = require('../../middlewares/validate');
const { hasPermission } = require('../../middlewares/auth');

router
  .route('/size')
  .get( hasPermission(['SHOW_PRODUCTS']),controller.getSizes)
  .post(hasPermission(['EDIT_PRODUCTS']), validator.sizeValidator(false), validate, controller.saveSize)
  .put(hasPermission(['EDIT_PRODUCTS']), validator.sizeValidator(true), validate, controller.editSize);

router.delete(
  '/size/:id',
  hasPermission(['EDIT_PRODUCTS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteSize
);

module.exports = router;
