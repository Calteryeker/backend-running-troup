const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  recordes: [Number]
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);