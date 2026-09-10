const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

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
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
/* prettier-ignore */
app.use((req, res) => res.status(404).send({ message: 'The solicitation was not found' }));

app.listen(PORT);
