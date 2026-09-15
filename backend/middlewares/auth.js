const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ForbiddenError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    return next(new ForbiddenError('Authorization required'));
  }

  req.user = payload;

  return next();
};
