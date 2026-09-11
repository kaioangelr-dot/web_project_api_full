const { PORT = 3000 } = process.env;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// user Id to get acess to the cards
app.use((req, res, next) => {
  req.user = {
    _id: '6a74cf835fca0893afab787f',
  };

  next();
});

app.use(express.json());

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

/* prettier-ignore */
app.use((req, res) => res.status(404).send({ message: 'The solicitation was not found' }));

app.listen(PORT);
