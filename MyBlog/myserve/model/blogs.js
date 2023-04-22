const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  //创建博客模型
  date: { type: Date }, //创建日期
  title: { type: String, require: true },
  // ????????????????????????????????????????????????
  // classification: { type: mongoose.Types.ObjectId, require: true }, //所属专栏
  favour: [
    {
      type: String,
    },
  ], //点赞的浏览器指纹数组
  browse: { type: Number, default: 0 },
  content: { type: String, require: true },
  digest: { type: String }, // 描述信息
  state: { type: Boolean, default: false }, // 状态：是否发布
});
const BlogModel = mongoose.model("blogs", BlogSchema);
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
module.exports = {
  addblog,
};
