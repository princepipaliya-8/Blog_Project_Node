const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogData",
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    require: true,
  },
});

module.exports = mongoose.model("commentBlog", comment);
