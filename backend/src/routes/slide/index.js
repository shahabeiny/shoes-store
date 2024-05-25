const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/favoriteValidator');
const validate = require('../../middlewares/validate');
const { isLoggined, hasPermission } = require('../../middlewares/auth');

router
  .route('/slide')
  .get(controller.getSlides)
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    validator.favoriteValidator(),
    validate,
    controller.saveSlide
  );

router.delete(
  '/slide/delete/:id',
  isLoggined,
  hasPermission(['EDIT_PRODUCTS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteSlide
);

module.exports = router;
