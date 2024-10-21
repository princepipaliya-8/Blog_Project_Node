const mongoose = require("mongoose");

const blogData = new mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  bName: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    required: true,
  },
});

module.exports = mongoose.model("BlogData", blogData);
