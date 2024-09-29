const blogModal = require("../Modal/mongooes/blogData");
const fs = require("fs");

const blogHost = async (req, res) => {
  const data = await blogModal.find();
  console.log("Data", data);

  res.render("blogs", { data });
};

const blogsPage = (req, res) => {
  res.render("blogForm");
};
const blogPage = async (req, res) => {
  const obj = new blogModal({
    Title: req.body.Title,
    path: req.file.path,
    content: req.body.content,
    bName: req.body.bName,
  });

  console.log("Body Is", obj);

  try {
    const blog = await obj.save();
    res.redirect("/blogs");
  } catch {
    res.redirect("/blogs/add");
  }
};
const editBlog = async (req, res) => {
  const { id } = req.params;

  const editBlog = await blogModal.findOne({ _id: id });

  res.render("blogEdit.ejs", { editBlog });
};

const blogUpdate = async (req, res) => {
  const { id } = req.params;

  const blogData = {
    Title: req.body.Title,
    path: req.file.path,
    content: req.body.content,
    bName: req.body.bName,
  };
  try {
    const blogD = await blogModal.updateOne({ _id: id }, blogData);
    res.redirect("/blogs");
  } catch {
    res.redirect("/blogs/edit");
  }
};

const blogsDelete = async (req, res) => {
  const { id } = req.params;

  const blogData = await blogModal.deleteOne({ _id: id });

  res.redirect("/blogs");
};
module.exports = {
  blogHost,
  blogsPage,
  blogPage,
  editBlog,
  blogUpdate,
  blogsDelete,
};
