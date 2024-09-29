const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/blogData")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Error", err));

const userData = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
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

module.exports = mongoose.model("userData", userData);
