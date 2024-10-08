const mongoose = require("mongoose");

const TitleData = new mongoose.Schema({
  titlee: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("TitleData", TitleData);
