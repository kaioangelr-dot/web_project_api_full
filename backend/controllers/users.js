const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

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
        err.statusCode = 404;
        err.message = 'User not found';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'User ID invalid format';
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((userData) => {
      const userObject = userData.toObject();
      delete userObject.password;
      res.status(201).send({ data: userObject });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Invalid data';
      } else if (err.code === 11000) {
        err.statusCode = 409;
        err.message = 'User with this email already exists';
      }
      next(err);
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
        err.statusCode = 404;
        err.message = 'User not found';
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Invalid data';
      }
      next(err);
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
        err.statusCode = 404;
        err.message = 'User not found';
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Invalid data';
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, 'secret-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id)
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        err.statusCode = 404;
        err.message = 'User not found';
      }
      next(err);
    });
};
