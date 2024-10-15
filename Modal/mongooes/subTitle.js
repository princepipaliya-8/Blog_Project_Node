const mongoose = require("mongoose");

const subTitleData = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TitleData",
    require: true,
  },
});

module.exports = mongoose.model("subTitleData", subTitleData);
