const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  user
    .findById(req.params.id)
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('User ID invalid format'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  /* prettier-ignore */
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  /* prettier-ignore */
  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((userData) => {
      const userObject = userData.toObject();
      delete userObject.password;
      res.status(201).send({ data: userObject });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Invalid data'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('User with this email already exists'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then(() => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id)
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      return next(err);
    });
};
