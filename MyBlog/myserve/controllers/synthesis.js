const BlogsModel = require("../model/blogs");

const ClassifyModel = require("../model/classifies");
// const MurmruModel = require("../model/murmurs");
const util = require("../utils");
const path = require("path");
const fs = require("fs");

// 获取总文章数
const getWebInfo = async (req, res, next) => {
  const blogNums = await BlogsModel.getblogSums();
  const jottingNums = await JottingModel.getJottingSums();
  const tagNums = await TagModel.getTagSums();
  const classifyNums = await ClassifyModel.getClassifySums();
  res.send({
    msg: "查询文章总数成功",
    status: 200,
    data: {
      blogNums,
      jottingNums,
      tagNums,
      classifyNums,
    },
  });
};
const getSliderInfo = async (req, res, next) => {
  const blogs = await BlogsModel.getPublishBlogs();
  blogs.forEach((item) => {
    item.date = util.formatDate(item.date);
  });

  const classifies = await ClassifyModel.getClassifies();
  if (blogs && blogs && classifies) {
    res.send({
      msg: "信息栏查询成功",
      status: 200,
      data: {
        blogs,

        classifies,
      },
    });
  } else {
    res.send({
      msg: "信息栏查询失败",
      status: 0,
    });
  }
};
// 搜索文章(关键字搜索)
const searchArticle = async (req, res) => {
  let { searchValue } = req.query;
  //搜索出来的博客，遍历出来，
  let blogs = await BlogsModel.searchBlogs(searchValue);
  blogs.forEach((item) => {
    item.date = util.formatDate(item.date);
    item.type = "blog";
  });
  //搜索便签
  let jottings = await JottingModel.searchJottings(searchValue);
  jottings.forEach((item) => {
    item.date = util.formatDate(item.date);
    item.type = "jotting";
  });
  //搜索出的数据整合出来，再返回到前端界面
  let data = [...blogs, ...jottings];
  if (data.length > 0) {
    res.send({
      msg: "搜索到文章",
      status: 200,
      data: {
        dataList: [...blogs, ...jottings],
      },
    });
  } else {
    res.send({
      msg: "未查询到相关信息",
      status: 0,
    });
  }
};

// 上传图片
const uploadArtimg = async (req, res) => {
  const file = req.file; //这个就是前端传来的文件
  const artimgUrl = util.imgBaseUrl("image") + file.filename;
  const url = path.join(__dirname, "../public/photos/", file.filename);
  console.log("url", url);
  console.log(req.file, "123");
  if (fs.existsSync(url)) {
    res.send({
      artimgUrl,
      status: 200,
      msg: "图片上传成功",
    });
  } else {
    res.send({
      status: 0,
      msg: "图片上传失败",
    });
  }
};

// 上传头像
const uploadAvatar = async (req, res) => {
  const { murmur, email } = req.body;
  const file = req.file; //这个就是前端传来的文件
  const avatarUrl = util.imgBaseUrl("avatar") + file.filename;
  const url = path.join(__dirname, "../public/avatars/", file.filename);
  let user = null,
    result = null;
  if (murmur) {
    user = await MurmruModel.getMurmurInfo(murmur);
  } else if (email) {
    user = await UserModel.getUser(email);
  }
  if (user.avatarUrl) {
    util.deleteImg(user.avatarUrl);
  }
  if (murmur) {
    result = await MurmruModel.updateMurmurAvatar(murmur, avatarUrl);
  } else {
    result = await UserModel.uploadAvatar(email, avatarUrl);
  }
  if (result.acknowledged && result.modifiedCount != 0 && fs.existsSync(url)) {
    res.send({
      avatarUrl,
      status: 200,
      msg: "头像上传成功",
    });
  } else {
    res.send({
      status: 0,
      msg: "头像上传失败",
    });
  }
};
// 获取数据面板数据
// 上传头像
const getDataForDataBoard = async (req, res) => {
  const classify = await ClassifyModel.getClassifyForDataBoard();
  const classification = classify.map((item) => {
    return { name: item.title, value: item.articleNum };
  });
  const blogs = await BlogsModel.getBlogs();
  const { blogsOf7 } = util.manangeDataBoard(blogs);
  if (blogsOf7) {
    res.send({
      data: {
        classification,
        blogsOf7,
      },
      status: 200,
      msg: "查询成功",
    });
  } else {
    res.send({
      status: 0,
      msg: "查询失败",
    });
  }
};
module.exports = {
  getWebInfo,
  getSliderInfo,
  searchArticle,
  uploadArtimg,
  uploadAvatar,
  getDataForDataBoard,
};
