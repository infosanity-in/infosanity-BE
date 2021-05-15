const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { ObjectId } = mongoose.Schema.Types;
const {
  CONTENT,
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
  reviewFlag: {
    type: String,
    enum: Object.values(CONTENT.FLAGS)
  }
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
  type: {
    type: String,
    enum: Object.values(CONTENT.TYPES),
  },
  flag: {
    type: String,
    enum: Object.values(CONTENT.FLAGS)
  },
  isSpam: {
    type: String,
    enum: Object.values(CONTENT.SPAM_TYPES)
  },
  verificationHash: {
    type: String,
    default: null
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