const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('../../validation/favoriteValidator');
const validate = require('../../middlewares/validate');

router
  .route('/favorite')
  .get(controller.getFavorites)
  .post(validator.favoriteValidator(), validate, controller.saveFavorite);

router.delete('/favorite/delete/:id',  validator.paramIdValidator(), validate, controller.deleteFavorite);

router.post('/rate/add', validator.rateValidator(), validate, controller.saveRate);

module.exports = router;
