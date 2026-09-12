const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((cardData) => res.status(201).send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Invalid data';
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const err = new Error('You have no permission to delete this card');
        err.statusCode = 403;
        throw err;
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        err.statusCode = 404;
        err.message = 'Card not found';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Card ID invalid format';
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        err.statusCode = 404;
        err.message = 'Card not found';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID invalid format';
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        err.statusCode = 404;
        err.message = 'Card not found';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID invalid format';
      }
      next(err);
    });
};
