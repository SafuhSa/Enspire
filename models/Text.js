const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  wrongtext: {
    type: String,
    required: true
  },
  correcttext: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Text = mongoose.model("Text", TextSchema);
