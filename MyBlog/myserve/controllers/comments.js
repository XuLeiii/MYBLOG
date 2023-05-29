const CommentModel = require("../model/comments");
const MurmruModel = require("../model/murmurs");
const util = require("../utils/index.js");
// 添加新一级评论
const addFirstComment = async (req, res, next) => {
  // 获取时间字符串
  const { keyId, articleTitle, reply, murmur, replyInfo = [] } = req.body;
  const result = await CommentModel.addFirstComment({
    date: Date.now(),
    keyId,
    // username,
    reply,
    murmur,
    replyInfo,
    articleTitle,
  });
  const comment = result.toObject();
  comment.date = util.formatTime(comment.date);
  if (comment) {
    res.send({
      msg: "评论成功",
      status: 200,
      data: comment,
    });
  } else {
    res.send({
      msg: "评论失败！",
      status: 0,
    });
  }
};
// 添加新次级评论到某个一级评论下
const addSecondComment = async (req, res, next) => {
  // 获取时间字符串
  const { _id, date, reply, murmur, replyName, replyId } = req.body;
  console.log("req.body", req.body);
  //根据二级评论的一级评论的id去查找到这个一级评论文档，将二级评论的内容传入replyinfo中的reply中
  const result = await CommentModel.addSecondComment(_id, {
    date: Date.now(),
    // replymurmur,
    replyId, //文章的id
    // username,
    reply, //二级评论的内容
    murmur, //二级评论的murmur信息
    replyName, //二级评论回复的那个评论的username名
  });
  console.log("11111111result", result);
  if (result.acknowledged && result.modifiedCount !== 0) {
    const comment = await CommentModel.getCommentReplyLast(_id); //查询对应id一级评论文档结构
    console.log("222222comment", comment);
    const newCom = comment.replyInfo.pop().toObject();
    console.log("newCom", newCom);
    newCom.date = util.formatTime(newCom.date);
    res.send({
      msg: "评论成功",
      status: 200,
      data: newCom,
    });
  } else {
    res.send({
      msg: "评论失败！",
      status: 0,
    });
  }
};
// 给一级评论点赞
const addFirstFavour = async (req, res) => {
  const { _id, favourMurmur } = req.query;
  const result = await CommentModel.addFirstFavour(_id, favourMurmur);
  if (result.acknowledged && result.modifiedCount !== 0) {
    res.send({
      msg: "点赞成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "点赞失败",
      status: 0,
    });
  }
};
// 给次级评论点赞
const addSecondFavour = async (req, res) => {
  const { _id, replyId, favourMurmur } = req.query;
  const result = await CommentModel.addSecondFavour(_id, replyId, favourMurmur);
  if (result.acknowledged && result.modifiedCount !== 0) {
    res.send({
      msg: "点赞成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "点赞失败",
      status: 0,
    });
  }
};
// 删除一级评论
const deleteFirstComment = async (req, res, next) => {
  const { _id } = req.query;
  const result = await CommentModel.deleteFirstComment(_id);
  if (result.acknowledged && result.deletedCount !== 0) {
    res.send({
      msg: "删除成功",
      status: 200,
      data: result,
    });
  } else {
    res.send({
      msg: "删除失败",
      status: 0,
    });
  }
};
// 删除次级评论
const deleteSecondComment = async (req, res, next) => {
  const { _id, replyId } = req.query;
  const result = await CommentModel.deleteSecondComment(_id, replyId);
  if (result.acknowledged && result.modifiedCount !== 0) {
    res.send({
      msg: "删除成功",
      status: 200,
    });
  } else {
    res.send({
      msg: "删除失败",
      status: 0,
    });
  }
};
// 查询某一篇文章的所有评论
const getCommentsOfArticle = async (req, res) => {
  const { id, pageSize, pageStart, murmur } = req.query;
  // 这里必须要await,获取该博客下的所有评论
  let comments = await CommentModel.getCommentsOfArticle(
    id, //文章id
    pageSize,
    pageStart
  );
  // console.log("comments222222222222222", comments);
  //获取所有的指纹信息
  const murmurInfos = await MurmruModel.getMurmurInfos();
  // console.log("murmurInfos11111111111111111111111", murmurInfos);
  //获取指定指纹的信息
  const user = await MurmruModel.getMurmurInfo(murmur);
  // console.log("user3333333333333333", user);
  //根据返回的全部一二级评论，和所有指纹信息,去生成对应的数据结构，方便前端处理数据，展示在一二级评论上
  comments = util.manageMurmurComments(murmurInfos, comments);
  console.log("comments", comments);
  if (comments) {
    res.send({
      msg: "查询成功",
      status: 200,
      data: { comments, user },
    });
  } else {
    res.send({
      msg: "查询失败",
      status: 0,
    });
  }
};
// 查询所有的评论
const getComments = async (req, res) => {
  // const { pageSize, pageStart, murmur } = req.query;
  // 这里必须要await
  let comments = await CommentModel.getComments();
  const murmurInfos = await MurmruModel.getMurmurInfos();
  comments = util.manageMurmurComments(murmurInfos, comments);
  if (comments) {
    res.send({
      msg: "查询成功",
      status: 200,
      data: comments,
    });
  } else {
    res.send({
      msg: "查询失败",
      status: 0,
    });
  }
};
module.exports = {
  addFirstComment,
  addSecondComment,
  addFirstFavour,
  addSecondFavour,
  deleteFirstComment,
  deleteSecondComment,
  getCommentsOfArticle,
  getComments,
};
