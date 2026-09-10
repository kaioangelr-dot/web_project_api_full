const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)*\.com(\/\S*)?$/.test(v), // prettier-ignore
      /* It starts with hhtp//: or https//:, does not allow consecutive dots, any space, and
      before the first .com it does not allow any other caracters than dots, digits,
      hifens and letters. It ends with either .com, .com/ or .com/'infinite caracters' */
    },
  },
});

module.exports = mongoose.model('user', userSchema);
