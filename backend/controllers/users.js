const user = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Server error' }));
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id)
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'User not found' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'User ID invalid format' });
      }
      return res.status(500).send({ message: 'Server error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user
    .create({ name, about, avatar })
    .then((userData) => res.status(201).send({ data: userData }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: 'Server error' });
    });
};

module.exports.updateUser = (req, res) => {
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
        return res.status(404).send({ message: 'User not found' });
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: 'Server error' });
    });
};

module.exports.updateAvatar = (req, res) => {
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
        return res.status(404).send({ message: 'User not found' });
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: 'Server error' });
    });
};
