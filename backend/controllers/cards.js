const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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
        return next(new BadRequestError('Invalid data'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You have no permission to delete this card');
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Card not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Card ID invalid format'));
      }
      return next(err);
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
        return next(new NotFoundError('Card not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID invalid format'));
      }
      return next(err);
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
        return next(new NotFoundError('Card not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID invalid format'));
      }
      return next(err);
    });
};
