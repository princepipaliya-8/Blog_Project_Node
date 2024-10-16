const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogData",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
});

module.exports = mongoose.model("commentBlog", comment);
