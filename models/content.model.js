const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { ObjectId } = mongoose.Schema.Types;
const {
  CONTENT_FLAGS,
  SPAM_TYPES,
} = require('../utils/constants');
const {
  AclSchema
} = require('./common');

const ReviewerSchema = new Schema({
  id: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  isReviewed: {
    type: Boolean,
    default: false
  },
}, {
  _id: false
});

const ContentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  flag: {
    type: String,
    enum: Object.values(CONTENT_FLAGS)
  },
  isSpam: {
    type: String,
    enum: Object.values(SPAM_TYPES)
  },
  masterVariationId: {
    type: ObjectId,
    ref: 'Content',
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  tags: [{
    id: {
      type: ObjectId,
      ref: 'Tag'
    },
    name: {
      type: String
    }
  }],
  reviews: {
    isReviewed: {
      type: Boolean,
      default: false
    },
    reviewers: [ReviewerSchema],
  },
  sourceMetaData: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
  },
  acl: AclSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', ContentSchema, 'contents');