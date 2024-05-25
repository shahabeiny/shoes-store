const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/userValidator');
const { hasPermission } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const trimBody = require('../../middlewares/trimBody');

router
  .route('/user')
  .get(hasPermission(['SHOW_USERS']), controller.getUsers)
  .put(hasPermission(['EDIT_USERS']), validator.editUserValidator(), validate, trimBody, controller.editUser)
  .post(validator.changePassValidator(), validate, trimBody, controller.editPassword)
  .patch(hasPermission(['EDIT_USERS']), validator.bannUserValidator(), validate, controller.bannUser);

router.delete(
  '/user/:id',
  hasPermission(['EDIT_USERS']),
  validator.paramIdValidator(),
  validate,
  controller.deleteUser
);

router.post(
  '/user/edit-profile',
  validator.editProfileValidator(),
  validate,
  trimBody,
  controller.editProfile
);

router.get('/user/login-info', controller.loginInfo);

router.get('/user/me', controller.me);

module.exports = router;
