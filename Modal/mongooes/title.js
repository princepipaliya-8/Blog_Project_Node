const mongoose = require("mongoose");

const TitleData = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  entry: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("TitleData", TitleData);
