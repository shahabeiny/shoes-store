const express = require('express');
const router = express.Router();

const auth_router = require('./auth');
const home_router = require('./home');
const size_router = require('./size');
const user_router = require('./user');
const role_router = require('./role');
const slide_router = require('./slide');
const color_router = require('./color');
const order_router = require('./order');
const brand_router = require('./brand');
const usage_router = require('./usage');
const favorite_router = require('./favorite');
const product_router = require('./product');
const productkind_router = require('./productKind');

const error = require('../middlewares/error');
const { isLoggined } = require('../middlewares/auth');

router.use('/size-router',  isLoggined,size_router);
router.use('/user-router', isLoggined, user_router);
router.use('/role-router', isLoggined, role_router);
router.use('/color-router', isLoggined, color_router);
router.use('/order-router', isLoggined, order_router);
router.use('/favorite-router', isLoggined, favorite_router);
router.use('/auth-router', auth_router);
router.use('/home-router', home_router);
router.use('/slide-router', slide_router);
router.use('/brand-router', brand_router);
router.use('/usage-router', usage_router);
router.use('/product-router', product_router);
router.use('/productkind-router', productkind_router);

router.use(error);

module.exports = router;
