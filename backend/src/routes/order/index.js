const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { hasPermission } = require('../../middlewares/auth');

router.post('/order/add-cart', controller.addCart);
router.patch('/order/muines-cart', controller.muinesCart);
router.delete('/order/delete-cart/:orderId', controller.deleteCart);
router.delete('/order/delete-product/:productOrderId', controller.deleteProduct);
router.post('/order/finish-cart', controller.finishCart);
router.get('/order/all-orders', controller.getOrders);

router.get('/order/all-orders-admin', hasPermission(['SHOW_ORDERS']), controller.getOrdersAdmin);
router.post('/order/confirm-order', hasPermission(['EDIT_ORDERS']), controller.confirmOrder);

module.exports = router;
