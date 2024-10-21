const mongoose = require("mongoose");

const TitleData = new mongoose.Schema({
  content: {
    type: String,
  },
  entry: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("TitleData", TitleData);
