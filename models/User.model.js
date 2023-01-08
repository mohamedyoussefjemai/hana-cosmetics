const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'SuperAdmin'],
    },
  },
  {
    timestamps: true,
  }
);
const User = model('users', UserSchema);
module.exports = User;
