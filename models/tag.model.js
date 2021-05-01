const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rank: {
    type: Number,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Tag', TagSchema, 'tags');