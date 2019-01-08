const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type:String,
    required:true
  },
  wrongtext: {
    type: String,
    required: true
  },
  correcttext: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Text = mongoose.model("Text", TextSchema);
