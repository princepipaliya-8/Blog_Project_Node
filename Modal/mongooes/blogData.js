const mongoose = require("mongoose");

const blogData = new mongoose.Schema({
  Title: {
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
});

module.exports = mongoose.model("BlogData", blogData);
