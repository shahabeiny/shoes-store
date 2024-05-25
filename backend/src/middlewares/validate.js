const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  if (!validationBody(req, res)) {
    return;
  }
  next();
};

const validationBody = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array();
    const messages = [];
    errors.forEach((err) => messages.push(err.msg));

    res.status(400).json({
      message:
        errors.length > 0 ? errors.map((error, index) => ` ${index + 1} : ${error.msg}  `).join('\n') : '',
      data: messages
    });
    return false;
  }
  return true;
};

module.exports = validate;
