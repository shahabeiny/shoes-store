const express = require('express');
const router = express.Router();
const validator = require('../../validation/userValidator');
const validate = require('../../middlewares/validate');
const controller = require('./controller');
const trimBody = require('../../middlewares/trimBody');
const { hasPermission } = require('../../middlewares/auth');

router
  .route('/role')
  .get(hasPermission(['SHOW_ROLES']), controller.getRoles)
  .post(hasPermission(['EDIT_ROLES']), validator.roleValidator(false), validate, trimBody, controller.addRole)
  .put(hasPermission(['EDIT_ROLES']), validator.roleValidator(true), validate, trimBody, controller.editRole);

router.delete(
  '/role/:id',
  hasPermission(['EDIT_ROLES']),
  validator.paramIdValidator(),
  validate,
  controller.deleteRole
);

module.exports = router;
