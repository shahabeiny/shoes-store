const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/userValidator');
const validate = require('../../middlewares/validate');
const trimBody = require('../../middlewares/trimBody');

router.post('/register', validator.registerValidator(), validate, trimBody, controller.register);

router.post('/otp-verify', validator.otpVerifyValidator(), validate, trimBody, controller.otpVerify);

router.post('/login', validator.loginValidator(), validate, trimBody, controller.login);

router.post('/forget', validator.mobileValidator(), validate, trimBody, controller.forget);

router.post('/change-pass', validator.changePassValidator(), validate, trimBody, controller.changePass);

router.post('/otp-restore', validator.mobileValidator(), validate, trimBody, controller.otpRestore);

module.exports = router;
