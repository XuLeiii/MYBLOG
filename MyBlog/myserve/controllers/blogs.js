const BlogsModel = require("../model/blogs");
const util = require("../utils");
const ClassifyModel = require("../model/classifies");
//添加博客
const addBlog = async (req, res) => {
  const { title, classification, content, digest, state } = req.body;
  // console.log("req.body", req.body);
  const blog = await BlogsModel.addblog({
    date: Date.now(),
    title,
    classification,
    content,
    digest,
    state,
  });
  console.log("专栏二", classification);
  await ClassifyModel.updateClassifySum(classification, 1);
  // console.log("bloggggggggg", blog);
  if (blog) {
    res.send({
      msg: "博客添加成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "博客添加失败！",
      status: 0,
    });
  }
};
//删除博客
const deleteBlog = async (req, res) => {
  const { _id, classification } = req.query;
  // console.log("1111111111111", req.query);
  const deleteBlog = await BlogsModel.deleteBlog(_id);
  await ClassifyModel.updateClassifySum(classification, -1);
  if (deleteBlog) {
    res.send({
      msg: "博客删除成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "博客删除失败！",
      status: 0,
    });
  }
};
// 更新博客
const updateBlog = async (req, res) => {
  const { content, _id, digest, title, classification } = req.body;
  // console.log("classification", classification);
  const result = await BlogsModel.updateBlog(
    _id,
    content,
    digest,
    title,
    classification
  );
  if (result.acknowledged && result.modifiedCount !== 0) {
    res.send({
      msg: "博客已更新",
      status: 200,
    });
  } else {
    res.send({
      msg: "更新失败！",
      status: 0,
    });
  }
};
//获取博客列表，后台管理界面用的。
const getBlogs = async (req, res) => {
  const blogs = await BlogsModel.getBlogs();
  // console.log("blog", blogs);
  blogs.forEach((item) => (item.date = util.formatDate(item.date))); //格式化时间格式工具
  if (blogs) {
    res.send({
      msg: "博客查询成功",
      status: 200,
      data: blogs,
    });
  } else {
    res.send({
      msg: "博客查询失败",
      status: 200,
    });
  }
};

// 获取已发布博客列表，前台展示用的。
const getPublishBlogs = async (req, res) => {
  // console.log("123123");
  const { pageStart, pageSize } = req.query;
  const dataList = await BlogsModel.getPublishBlogs(pageStart, pageSize);
  const count = await BlogsModel.getblogSums();
  dataList.forEach((item) => (item.date = util.formatDate(item.date)));
  if (dataList) {
    res.send({
      msg: "博客查询成功",
      status: 200,
      data: { dataList, count },
    });
  } else {
    res.send({
      msg: "博客查找失败",
      status: 0,
    });
  }
};
// 获取某一个博客
const getBlog = async (req, res) => {
  const { _id } = req.query;
  // 这里必须要await
  const blog = await BlogsModel.getBlog(_id);
  // console.log("blog", blog);
  blog.date = util.formatTime(blog.date);
  // console.log("blog", blog);
  blog._id = blog._id.toString();
  const classify = await ClassifyModel.getClassify(blog.classification);
  // console.log("classify", classify);
  blog.classifyName = classify?.title;
  if (blog) {
    res.send({
      msg: "博客查找成功",
      status: 200,
      data: blog,
    });
  } else {
    res.send({
      msg: "博主正在马不停蹄的创作中，敬请谅解！",
      status: 0,
    });
  }
};
//增加点赞
const addFavour = async (req, res) => {
  const { _id, favourMurmur } = req.query;
  // 增加点赞数
  const addFavour = await BlogsModel.addFavour(_id, favourMurmur);
  // console.log("addfavour", addFavour);
  const getFavour = await BlogsModel.getFavour(_id);
  // console.log("getFavour", getFavour);
  if (addFavour) {
    res.send({
      msg: "博客点赞成功",
      status: 200,
      data: getFavour.favour,
    });
  } else {
    res.send({
      msg: "博客点赞失败！",
      status: 0,
    });
  }
};
// 增加浏览量
const addBlogBrowse = async (req, res) => {
  const { _id } = req.query;
  const result = await BlogsModel.addBlogBrowse(_id);
  if (result.modifiedCount === 1) {
    res.send({
      msg: "博客浏览量增加成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "博客浏览量增加失败",
      status: 0,
    });
  }
};
// 获取某专栏下所有博客
const getBlogsOfClassify = async (req, res) => {
  const { classification } = req.query;
  console.log("classificationclassification", classification);
  const dataList = await BlogsModel.getBlogsOfClassify(classification);
  dataList.forEach((item) => (item.date = util.formatDate(item.date)));
  if (dataList) {
    res.send({
      msg: "查找博客成功",
      status: 200,
      data: {
        dataList,
      },
    });
  } else {
    res.send({
      msg: "博主正在加班加点的创作中，敬请谅解！",
      status: 0,
    });
  }
};
module.exports = {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getPublishBlogs,
  getBlog,
  addFavour,
  addBlogBrowse,
  getBlogsOfClassify,
};
