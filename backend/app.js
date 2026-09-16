const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
app.use(requestLogger);

const validateURL = (value, helpers) => {
  if (
    /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)*\.[A-Za-z]{2,}(:\d+)?(\/\S*)?$/.test(
      value,
    )
  ) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

mongoose
  .connect(
    'mongodb+srv://<db_username>:ldrpLIRXGj6Q58Os@cluster0.rgeploi.mongodb.net/?appName=Cluster0/aroundb',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server crashed for testing purposes');
  }, 0);
});

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

/* prettier-ignore */
app.use((req, res) => res.status(404).send({ message: 'The solicitation was not found' }));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
});

app.listen(PORT);
