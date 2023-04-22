<template>
  <div class="blog">
    <div class="blog-top">
      <h3>博客标题</h3>
      <div class="tag">博客书签</div>
      <div class="footer">
        <div class="footer-left">
          <i class="el-icon-view">123</i>
          <i class="el-icon-view">321</i>
        </div>
        <i class="el-icon-date"> 写于 2023-03-19</i>
      </div>
    </div>
    <div class="blog-bottom">我是博客内容<br>hahahahahahahahah</div>
    <CommentM style="margin-top:1px"></CommentM>
  </div>
</template>

<script>
import CommentM from "../components/CommentM.vue"
export default {
    components:{CommentM}
};
</script>

<style lang="less" scoped>
.blog-top {
  padding: 10px;
  height: 150px;
  background-color: #fff;
  border-radius: 10px;
  h3 {
    padding: 0px 0px 10px 0px;
    text-align: center;
  }
  .tag {
    text-align: center;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 75px;
    .footer-left {
      margin-left: 10px;
    }
    i {
      margin-right: 20px;
    }
  }
}
.blog-bottom {
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    }
</style>
