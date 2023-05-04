const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  //创建博客模型
  date: { type: Date }, //创建日期
  title: { type: String, require: true },
  // ????????????????????????????????????????????????
  classification: { type: String, require: true }, //所属专栏
  favour: { type: Number, default: 0 }, //点赞数量
  browse: { type: Number, default: 0 },
  content: { type: String, require: true },
  digest: { type: String }, // 描述信息
  state: { type: Boolean, default: false }, // 状态：是否发布
});
const BlogModel = mongoose.model("blogs", BlogSchema);
//新增博客
const addblog = (data) => {
  console.log("这是传入数据库的data", data);
  let article = new BlogModel(data);
  return article
    .save()
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log("err", err);
      return false;
    });
};
// 删除博客
const deleteBlog = (_id) => {
  return BlogModel.deleteOne({ _id }).lean();
};
// 更新博客
const updateBlog = (_id, content, digest, title, classification) => {
  return BlogModel.updateOne(
    { _id },
    { $set: { content, title, digest, classification } }
  );
};
//查询所有博客
const getBlogs = () => {
  return BlogModel.find().sort({ date: -1 }).lean(); //查询模型中的所有文档并转为js对象返回。
};

// 查询所有已发布的博客
const getPublishBlogs = (pageStart = 0, pageSize = 5) => {
  return BlogModel.find(
    { state: true },
    "_id date digest favour title browse classification"
  )
    .skip(pageStart)
    .limit(pageSize)
    .lean();
};
// 查询所有已发布的博客的数量
const getblogSums = () => {
  return BlogModel.find({ state: true }).count();
};
// 查询某一博客
const getBlog = (id) => {
  return BlogModel.findById(id).lean();
};
//增加点赞的数量
const addFavour = (id, num) => {
  return BlogModel.updateOne({ id }, { $inc: { favour: num } });
};
// 获取点赞数
const getFavour = (_id) => {
  return BlogModel.findById(_id, "favour");
};
// 增加浏览量
const addBlogBrowse = (_id) => {
  return BlogModel.updateOne({ _id }, { $inc: { browse: 1 } });
};
// 查询某一专栏下的所有博客
const getBlogsOfClassify = (classification) => {
  return BlogModel.find({ classification, state: true }).lean();
};
module.exports = {
  addblog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getPublishBlogs,
  getblogSums,
  getBlog,
  addFavour,
  getFavour,
  addBlogBrowse,
  getBlogsOfClassify,
};
