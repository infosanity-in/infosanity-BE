const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { ObjectId } = mongoose.Schema.Types;

const AclSchema = new Schema({
  createdBy: {
    id: {
      type: ObjectId,
      ref: 'user'
    },
    email: {
      type: String
    },
    name: {
      type: String,
    }
  },
  updatedBy: {
    id: {
      type: ObjectId,
      ref: 'user'
    },
    email: {
      type: String
    },
    name: {
      type: String,
    }
  }
})

module.exports = {
  AclSchema
};