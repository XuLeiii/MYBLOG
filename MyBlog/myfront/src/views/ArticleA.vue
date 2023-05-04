<template>
  <div class="blog">
    <div class="blog-top">
      <h3>{{ article.title }}</h3>
      <div class="tag">专栏:{{ article.classification }}</div>
      <!-- <div class="tag">简要:{{this.article.digest}}</div> -->

      <div class="footer">
        <div class="footer-left">
          <i
            class="el-icon-lollipop"
            @click="giveALike(article._id)"
            :class="isGiveALiked ? 'active' : ''"
            style="cursor: pointer"
            >{{ favourList }}</i
          >
          <i class="el-icon-view">{{article.browse}}</i>
        </div>
        <i class="el-icon-date"> 写于{{ this.article.date }}</i>
      </div>
    </div>
    <div class="blog-bottom">{{ this.article.content }}</div>
    <CommentM style="margin-top: 1px" :keyId="$route.query.id"></CommentM>
  </div>
</template>

<script>
import CommentM from "../components/CommentM.vue";
import { getBlog, giveBlogALike, addBlogBrowse } from "../api/api.js";

export default {
  data() {
    return {
      article: {},
      favourList: [],
      isGiveALiked: false,
    };
  },
  components: { CommentM },
  methods: {
    // 获取文章详细信息
    async getArticle() {
      try {
        let id = this.$route.query.id;
        console.log("this.$route.query", this.$route.query);
        let res = {};
        this.favourList = [];
        //发送请求
        addBlogBrowse({ _id: id });
        console.log("this.$api", this.$api);
        res = await getBlog({ _id: id });
        if (res.status === 200) {
          this.article = res.data;
          this.favourList = res.data.favour;
          console.log(" this.article", this.article);
          // const murmur = localStorage.getItem("browserId");
          // this.isGiveALiked = this.favourList.includes(murmur) ? true : false;
        } else {
          this.$message.error("网络出错了,(ノへ￣、)！");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },

    // 点赞
    async giveALike(id) {
      try {
        if (this.isGiveALiked) {
          this.$message.warning("您已经点过赞啦！");
          return;
        }
        let res = {};
        res = await giveBlogALike({
          _id: id,
        });
        if (res.status === 200) {
          this.favourList = res.data;
          this.isGiveALiked = true;
          this.$message.success(res.msg);
        } else {
          this.$message.error("网络出错了,(ノへ￣、)！");
        }
      } catch (error) {
        console.log("id", id);
        this.$message.error(error);
      }
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
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
