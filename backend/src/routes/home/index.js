const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/main', controller.main);
router.get('/header', controller.header);

module.exports = router;
  