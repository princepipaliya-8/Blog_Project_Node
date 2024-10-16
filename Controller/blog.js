const { log } = require("console");
const blogModal = require("../Modal/mongooes/blogData");
const commentBlogData = require("../Modal/mongooes/comment");
const fs = require("fs");

const blogHost = async (req, res) => {
  const data = await blogModal.find();

  if (data) {
    res.render("blogs", { data, user: req.user });
  }
};

const blogsPage = (req, res) => {
  res.render("blogForm");
};

const myBlogs = async (req, res) => {
  const commentData = await commentBlogData
    .find({})
    .populate({ path: "blog", populate: { path: "userId" } })
    .populate("user");

  console.log("commentData", commentData);

  const data = await blogModal.find();
  res.render("myBlog", { data, commentData });
};
const blogPage = async (req, res) => {
  const obj = new blogModal({
    Title: req.body.Title,
    path: req.file.path,
    content: req.body.content,
    bName: req.body.bName,
    userId: req.user._id,
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
const commentBlog = async (req, res) => {
  // try {
  //   const obj = new commentBlogData({
  //     comment: req.body.comment,
  //     user: req.user._id,
  //   });

  //   console.log("Body Is", obj);
  //   const blog = new commentBlogData(obj);

  //   await blog.save();
  //   res.redirect("/my-blogs");
  //   console.log("blog", blog);
  //   const blogd = await commentBlogData.find({}).populate("blog");
  //   console.log("blogd", blogd);
  // } catch {
  //   res.redirect("/blogs/add");
  //   console.log("error");
  // }'
  console.log("reqBody", req.body);

  const commentData = {
    comment: req.body.comment,
    blog: req.body.blogId,
    user: req.user._id,
  };

  const comment = await new commentBlogData(commentData);
  console.log("comment", comment);
  await comment.save();
  res.redirect("/my-blogs");
};
module.exports = {
  blogHost,
  blogsPage,
  blogPage,
  editBlog,
  blogUpdate,
  blogsDelete,
  myBlogs,
  commentBlog,
};
