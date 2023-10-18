const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
