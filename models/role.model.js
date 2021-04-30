const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const {
  PERMISSION_MODULES,
  ACCESS_TYPES,
} = require('../utils/constants');

const PermissionSchema = new Schema({
  module: {
    type: String,
    enum: Object.values(PERMISSION_MODULES),
  },
  access: [{
    type: String,
    enum: Object.values(ACCESS_TYPES)
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