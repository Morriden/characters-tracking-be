const mongoose = require('mongoose');

const character = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 300,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

module.exports = mongoose.model('Character', character);
