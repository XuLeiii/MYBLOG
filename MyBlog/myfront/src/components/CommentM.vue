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
      >
      </el-input>
      <!-- 留言按钮 -->
      <el-button type="primary">评论</el-button>
    </el-card>
    <!-- 评论展示 -->
    <div class="comment-body">
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
            <h4>评论名</h4>
            <p>2023-03-19 11:03</p>
            <div class="content">
              评论内容是的没错我觉得你写的很好很对对非续航对
            </div>
          </div>
        </div>
        <div class="firstComment-right">
          <i class="iconfont icon-icon">0</i>
          <i class="el-icon-chat-dot-round">回复</i>
          <i class="el-icon-delete">删除</i>
        </div>
      </div>
      <!-- 二级评论 -->
      <div class="secondComment">
        <div class="secondComment-left">
          <el-avatar
            size="large"
            :src="headerimg"
            fit="cover"
            shape="square"
            class="secondComment-left"
          ></el-avatar>
          <div class="secondComment-body">
            <h4>评论名</h4>
            <p>2023-03-19 11:03</p>
            <div class="content">
              评论内容是的没错我觉得你写的很好很对对非续航对
            </div>
          </div>
        </div>
        <div class="secondComment-right">
          <i class="iconfont icon-icon">0</i>
          <i class="el-icon-chat-dot-round">回复</i>
          <i class="el-icon-delete">删除</i>
        </div>
        <!-- 留言样式（默认隐藏，点击留言显示，占用二级评论的bfc模块） -->
        <div class="liuyan" v-show="false">
            <el-input placeholder="请输入你的留言"></el-input>
            <el-button type="primary">回复</el-button>
        </div>
      </div>
    </div>
    <!-- 无留言状态 -->
    <el-empty description="暂无留言"></el-empty>
  </div>
</template>

<script>
import header_img from "../assets/img/nightBg.jpg";
export default {
  data() {
    return {
      headerimg: header_img,
    };
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
    padding: 5px 10px 0px 10px;
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
  //   二级评论
  .secondComment {
    margin-left: 55px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 1);
    .secondComment-left {
      display: flex;
      justify-content: space-between;
      .secondComment-body {
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
    .secondComment-right {
      font-size: 14px;
      i {
        margin-left: 20px;
      }
    }
  }
}
</style>
