const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      /* prettier-ignore */
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)*\.com(\/\S*)?$/.test(v),
      /* It starts with hhtp//: or https//:, does not allow consecutive dots, any space, or
      any other caracter than dots, digits, hifens and letters. It ends with either
      .com, .com/ or .com/'infinite caracters' */
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
