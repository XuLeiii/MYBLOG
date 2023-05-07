<template>
  <div class="comment">
    <!-- 评论输入 -->
    <el-card class="comment-header" body-style="padding:10px 5px">
      <!-- 头像区 -->
      <el-tooltip content="点我换头像" placement="top">
        <el-avatar
          size="large"
          :src="headerimg"
          fit="cover"
          shape="square"
        ></el-avatar>
      </el-tooltip>
      <!-- 输入区 -->
      <el-input
        class="input"
        autosize
        placeholder="请输入内容"
        type="textarea"
        resize="none"
        v-model="context"
        @focus="isShowSecReply(undefined)"
      >
      </el-input>
      <!-- 博客中的评论按钮 -->
      <el-button type="primary" @click="submitInfo(keyId, undefined)"
        >评论</el-button
      >
    </el-card>
    <!-- 一个大评论展示 -->
    <div
      class="comment-body"
      v-for="(item, index) in comments"
      :key="item.murmur + '' + index"
    >
      <!-- 一级评论 -->
      <div class="firstComment">
        <div class="firstComment-left">
          <el-avatar
            size="large"
            :src="headerimg"
            fit="cover"
            shape="square"
            class="firstComment-left"
          ></el-avatar>
          <div class="firstComment-body">
            <h4>{{ item.username }}</h4>
            <p>{{ item.date }}</p>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="firstComment-right">
          <i class="iconfont icon-icon">0</i>
          <i
            class="el-icon-chat-dot-round"
            @click="isShowSecReply(item._id)"
            style="cursor: pointer"
            >回复</i
          >
          <i class="el-icon-delete">删除</i>
        </div>
      </div>
      <!-- 回复一级评论框 -->
      <div class="reply-comment" v-show="isShowSec === item._id">
        <el-input
          placeholder="请输入最多150字的评论...."
          class="input"
          v-model.trim="replyContext"
          :maxlength="150"
        >
        </el-input>
        <el-button
          type="info"
          size="mini"
          class="reply-button"
          @click="submitInfo(item._id, item.username)"
          >回复
        </el-button>
      </div>
      <!-- 二级评论 -->
      <div
        class="secondComment"
        v-for="(reply, index) in item.children"
        :key="reply.murmur + '' + index"
      >
        <div class="secondComment-left">
          <el-avatar
            size="large"
            :src="headerimg"
            fit="cover"
            shape="square"
            class="secondComment-left"
          ></el-avatar>
        </div>
        <div class="secondComment-body">
          <h4>{{ reply.username }}</h4>
          <p>{{ reply.date }}</p>
          <span class="to_reply">{{ reply.username }} 回复</span>

          <span class="to_reply"> {{ reply.replyName }}</span
          >:
          <div class="content">
            {{ reply.reply }}
          </div>
        </div>
        <div class="secondComment-right">
          <i class="iconfont icon-icon">0</i>
          <i
            class="el-icon-chat-dot-round"
            @click="isShowSecReply(reply._id)"
            style="cursor: pointer"
            >回复</i
          >
          <i class="el-icon-delete">删除</i>
        </div>
        <div class="secondereply-comment" v-show="isShowSec === reply._id">
          <el-input
            placeholder="请输入最多150字的评论...."
            class="input"
            v-model.trim="replyContext"
            :maxlength="150"
          >
          </el-input>
          <el-button
            type="info"
            size="mini"
            class="reply-button"
            @click="submitInfo(item._id, item.username)"
            >回复
          </el-button>
        </div>
        <div class="liuyan" v-show="false">
          <el-input placeholder="请输入你的留言"></el-input>
          <el-button type="primary">回复</el-button>
        </div>
      </div>
    </div>
    <!-- 无留言状态 -->
    <el-empty description="暂无留言" v-show="comments.length === 0"></el-empty>
  </div>
</template>

<script>
import {
  addMurmur,
  addfirstcomment,
  getCommentsOfArticle,
  addsecondcomment,
} from "../api/api.js";
import header_img from "../assets/img/nightBg.jpg";
export default {
  props: {
    keyId: {
      type: String,
    },
  },
  data() {
    return {
      comments: [], // 获取得到的评论
      replyContext: "", //回复一级评论的双向数据绑定
      headerimg: header_img,
      isShowSec: "",
      isClickId: "",
      username: "",
      context: "", // 评论内容
      murmur: localStorage.getItem("browserId"),
      avatarUrl: "",
      page: 1,
      // 当前分页开始
      pageStart: 0,
      pageSize: 11,
      replyName: "",
    };
  },
  methods: {
    //通用提交评论按钮事件
    submitInfo(id, replyName) {
      if (!this.username) {
        this.$prompt("请输入你的名字", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then((username) => {
            if (!username.value) {
              throw new Error();
            }
            console.log("username.value", username.value);
            console.log("this.userneme1111111", this.userneme);
            addMurmur({
              murmur: this.murmur,
              username: username.value,
            }).then((res) => {
              console.log("this.userneme222222222", this.userneme);
              this.addComment(id, replyName);
              console.log("object");
              this.username = res.data.username;
            });
          })
          .catch((err) => {
            if (err == "cancel") {
              this.$message({
                type: "info",
                message: "取消输入",
              });
            } else {
              this.$message.warning({
                message: "名字不能为空哦！",
              });
            }
          });
      } else {
        this.addComment(id, replyName);
      }
    },
    //通用添加评论事件
    async addComment(id, replyName) {
      let res = null;
      if (replyName) {
        if (!this.replyContext) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        res = await addsecondcomment({
          _id: id,
          reply: this.replyContext,
          replyName,
          murmur: this.murmur,
        });
      } else {
        if (!this.context) {
          this.$message.warning("评论或留言不能为空哦！");
          return;
        }
        res = await addfirstcomment({
          keyId: id,
          content: this.context,
          murmur: this.murmur,
          articleTitle: this.articleTitle,
        });
      }
      console.log("ressss", res);
      console.log("this.username777777777", this.username);

      if (res.status === 200) {
        this.$message.success(res.msg);
        // this.username = res.data.username; //?????
        // this.avatarUrl = res.data.avatarUrl; //??????????????
        console.log("this.username", this.username);
        res.data.username = this.username;
        res.data.avatarUrl = this.avatarUrl;
        if (replyName) {
          // const comment = this.comments.find((item) => item._id == id); //查询后端返回的全部评论，找到本篇文章的评论，赋值给commment
          // console.log("comment1111", comment);
          // if (!comment.replyInfo) {
          //   comment.replyInfo = [];
          //   console.log("1111111111111");
          // }
          // comment.replyInfo.push(res.data);
          // console.log("comment.replyInfo", comment.replyInfo);
          this.replyContext = "";
        } else {
          this.comments.push(res.data.content);
          this.context = "";
        }
      } else {
        this.$message.error(res.msg);
      }
      this.getCommentList();
      this.isShowSec = this.isClickId = "";
    },
    // 获取本篇文章所有评论
    async getCommentList(pageStart, pageSize) {
      try {
        this.comments = [];
        let id = "";
        if (this.keyId == "messageBoard") {
          id = "messageBoard";
        } else {
          id = this.keyId;
        }
        const res = await getCommentsOfArticle({
          id,
          pageSize,
          pageStart,
          murmur: this.murmur,
        });
        this.comments = res.data.comments;
        console.log(" this.comments", this.comments);
        this.username = res.data.user?.username;
        this.avatarUrl = res.data.user?.avatarUrl;
      } catch (err) {
        this.$message.error(err);
      }
    },
    //是否展示二级评论输入框
    isShowSecReply(id) {
      if (id) {
        this.isShowSec = id;
        if (this.isClickId === this.isShowSec) {
          this.isShowSec = "";
        } else {
          this.isShowSec = id;
        }
        this.isClickId = this.isShowSec;
        // this.replyName = name;
      } else {
        this.isShowSec = this.isClickId = "";
      }
    },
  },
  mounted() {
    this.getCommentList();
  },
};
</script>

<style lang="less" scoped>
//上部样式
.comment-header {
  border-radius: 10px 10px 0px 0px;
  /deep/ .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-avatar--large {
      width: 60px;
      height: 50px;
    }
    .input {
      margin: 5px;
      /deep/ .el-textarea__inner {
        height: 50px;
      }
    }
  }
}

// 下部样式
.comment-body {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  // 一级评论
  .firstComment {
    padding: 10px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    .firstComment-left {
      display: flex;
      justify-content: space-between;
      .firstComment-body {
        margin-left: 10px;
        p {
          font-size: 10px;
          color: rgb(70, 70, 70);
        }
        .content {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .firstComment-right {
      font-size: 14px;
      i {
        margin-left: 20px;
      }
    }
  }
  .secondComment {
    margin: 10px 0px 0px 60px;
    padding: 10px 10px 10px 20px;
    background-color: rgba(246, 246, 246, 0.8);
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .secondComment-left {
      display: flex;
      justify-content: space-between;
    }
    .secondComment-body {
      width: 67%;
      margin-left: 10px;
      p {
        font-size: 10px;
        color: rgb(70, 70, 70);
      }
      .content {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .secondComment-right {
      font-size: 14px;
      i {
        margin-left: 20px;
      }
    }
    .secondereply-comment {
      width: 100%;
      padding: 10px 0px 0px 0px;
      display: flex;
      justify-content: space-between;
      margin-left: 50px;
    }
    .to_reply {
      font-size: 10px;
      color: rgb(126, 127, 128);
    }
  }
}
</style>
