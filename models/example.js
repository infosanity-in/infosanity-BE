const mongoose = require("mongoose");
const { Schema } = mongoose;

const exampleSchema = new Schema({
  name: String,
  isRequired: Boolean,
});

const Example = mongoose.model("Example", exampleSchema);
module.exports = Example;
