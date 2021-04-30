const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
  },
  mobile: {
    countryCode: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  roleId: {
    type: ObjectId,
    ref: 'Role',
    default: null,
  },
  token: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'users');