const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: { data: Buffer, contentType: String },
});
module.exports = mongoose.model("notes", noteSchema);
