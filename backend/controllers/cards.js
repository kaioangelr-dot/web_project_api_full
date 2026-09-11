const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Server error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cardData) => res.status(201).send({ data: cardData }))
    .catch((err) => {
      // checks if there's an invalid format, it's checked in the /models/card.js
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: 'Card not created' });
    });
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.id;
  Card.findById(cardId).then((card) => {
    if (card.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: 'You have no permission to delete this card' });
    }
    return Card.findByIdAndDelete(cardId)
      .orFail()
      .then((cardData) => res.send({ data: cardData }))
      .catch((err) => {
        if (err.name === 'DocumentNotFoundError') {
          return res.status(404).send({ message: 'Card not found' });
        }
        if (err.name === 'CastError') {
          return res.status(400).send({ message: 'Owner ID invalid format' });
        }
        return res.status(500).send({ message: 'server error' });
      });
  });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID invalid format' });
      }
      return res.status(500).send({ message: 'server error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID invalid format' });
      }
      return res.status(500).send({ message: 'server error' });
    });
};
