const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const {
  CONTENT,
  ROLE_ACCESS_TYPES,
} = require('../utils/constants');

const PermissionSchema = new Schema({
  module: {
    type: String,
    enum: Object.values(CONTENT.TYPES),
  },
  access: [{
    type: String,
    enum: Object.values(ROLE_ACCESS_TYPES)
  }]
}, {
  _id: false
});

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  permissions: [PermissionSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema, 'roles');