<template>
  <div class="blog">
    <div class="blog-top">
      <h3>{{ article.title }}</h3>
      <div class="tag">
        <el-tag type="success">{{ article.classification }}</el-tag>
      </div>
      <!-- <div class="tag">简要:{{this.article.digest}}</div> -->

      <div class="footer">
        <div class="footer-left">
          <i
            class="el-icon-lollipop"
            @click="giveALike(article._id)"
            :class="isGiveALiked ? 'active' : ''"
            style="cursor: pointer"
            >{{ favourList.length }}</i
          >
          <i class="el-icon-view">{{ article.browse }}</i>
        </div>
        <i class="el-icon-date"> 写于{{ this.article.date }}</i>
      </div>
    </div>
    <mavon-editor
      v-model="this.article.content"
      ref="md"
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
      :ishljs="true"
      codeStyle="rainbow"
      class="markdown"
    />
    <CommentM style="margin-top: 1px" :keyId="$route.query.id"></CommentM>
  </div>
</template>

<script>
import CommentM from "../components/CommentM.vue";
import { getBlog, giveBlogALike, addBlogBrowse } from "../api/api.js";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      article: {},
      favourList: [],
      isGiveALiked: false,
    };
  },
  components: { CommentM, mavonEditor },
  methods: {
    // 获取文章详细信息
    async getArticle() {
      try {
        console.log("this.$route.params.id", this.$route.params.id);

        let id = this.$route.params.id;
        let res = {};
        this.favourList = [];
        //发送请求
        addBlogBrowse({ _id: id });
        res = await getBlog({ _id: id });
        if (res.status === 200) {
          this.article = res.data;
          this.favourList = res.data.favour;
          console.log(" this.article", this.article);
          const murmur = localStorage.getItem("browserId");
          this.isGiveALiked = this.favourList.includes(murmur) ? true : false;
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
        let murmur = localStorage.getItem("browserId");

        if (this.isGiveALiked) {
          this.$message.warning("您已经点过赞啦！");
          return;
        }
        let res = {};
        res = await giveBlogALike({
          _id: id,
          favourMurmur: murmur,
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
  watch: {
    $route() {
      if (this.$route.params.id) {
        // console.log("this.$route.params.id", this.$route.params.id);
        this.getArticle();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
.blog-top {
  padding: 10px;
  height: 160px;
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
.markdown {
  margin: 10px 0px 0px 0px;
  z-index: 0;
}
</style>
