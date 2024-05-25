const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const config = require('config');


async function isLoggined(req, res, next) {
  const token = req.get('Authorization')?.split(' ');
  console.log(req.body)
  if (!token || !token[1]) {
    res.status(401).send({ data: {}, message: 'امکان دسترسی ندارید' });
    return;
  }

  try {
    const decoded = jwt.verify(token[1], config.get('jwt_key'));
    const user = await User.findById(decoded._id).populate({
      path: 'role',
      populate: {
        path: 'permissions'
      }
    });
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send({ data: {}, message: 'توکن نامعتبر است' });
  }
}

async function isLogginedOptional(req, res, next) {
  const token = req.get('Authorization')?.split(' ');

  if (token && token[1]) {
    try {
      const decoded = jwt.verify(token[1], config.get('jwt_key'));
      const user = await User.findById(decoded._id);
      req.user = user;
    } catch (ex) {
      return next(new BadRequestError('توکن نامعتبر است'));
    }
  }

  next();
}


function hasPermission(requiredPermissions) {
  return function (req, res, next) {

    const userPermissions = req.user.role.permissions.map((permission) => permission.nameEng);

    const hasAllPermissions = requiredPermissions.every((permission) => userPermissions.includes(permission));

    if (hasAllPermissions) {
      next();
    } else {
      res.status(403).send({ data: {}, message: 'شما دسترسی به این عملیات را ندارید' });
    }
  };
}

module.exports = { isLogginedOptional, isLoggined, hasPermission };
