<template>
  <div class="siderinfo-box">
    <!-- 1. -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-edit-outline" style="margin-right: 10px"></i>专栏
      </div>
      <div
        class="card-item"
        v-for="item in classifyList"
        :key="item._id"
        @click="getBlogsOfClassify(item)"
      >
        <span>{{ item.title }}</span> <span>{{ item.articleNum }}</span>
      </div>
      <!-- <el-empty description="专栏在路上" :image-size="50"></el-empty> -->
    </el-card>
    <!-- 3 -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-medal" style="margin-right: 10px"></i>最新博客
      </div>
      <div class="card-item" v-for="item in blogList" :key="item._id">
        <span>{{ item.title }}</span> <span>{{ item.date.substr(2) }}</span>
      </div>
      <!-- <el-empty description="你猜为什么没有？" :image-size="50"></el-empty> -->
    </el-card>
    <!-- 4 -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <!-- <i class="el-icon-document" style="margin-right: 10px"></i>日历 -->
        <el-calendar v-model="time" class="calendar card"> </el-calendar>
      </div>
      <div class="car-item"></div>
      <el-empty description="无·博客" :image-size="50"></el-empty>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getSliderInfo } from "../api/api.js";
export default {
  data() {
    return {
      time: new Date(),
      blogsOfClassify: [],
      searchs: [],
      classifyList: [],
    };
  },
  computed: {
    ...mapState({
      blogs: (state) => state.synthesis.blogs,
      classifies: (state) => state.synthesis.classifies,
    }),
    ...mapGetters(["mainBg", "color"]),
  },
  methods: {
    // 获取基本信息
    async getBaseInfo() {
      try {
        if (this.blogs.length > 0 && this.classifies.length > 0) {
          this.classifyList = this.classifies;
          this.blogList = this.blogs;
        } else {
          const res = await getSliderInfo();
          if (res.status === 200) {
            this.classifyList = res.data.classifies || [];
            if (res.data.blogs.length > 0)
              this.blogList = res.data.blogs.slice(0, 3);
            this.$store.commit("SAVECLASSIFIES", this.classifies);
            this.$store.commit("SAVEBLOG", res.data.blogs);
            console.log("123123", this.classifyList);
          } else {
            this.$message.error("网络出错了,(ノへ￣、)！");
          }
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 获取某一专栏下下所有博客
    async getBlogsOfClassify(item) {
      console.log("item", item);
      this.$router.push({
        path: "/list/blog?classification=" + item.title,
      });
    },
  },
  mounted() {
    this.getBaseInfo();
  },
};
</script>

<style scoped lang="less">
.siderinfo-box {
  width: 16vw;
  height: 100vh;
  .el-card {
    border-radius: 10px;
    border: 0px;
    margin-top: 5px;
    height: 280px;
    background-color: rgba(255, 255, 255, 0.6);
    color: #000;
    .card-head {
      font-size: 18px;
      border-bottom: 1px solid #fff;
    }
    .el-empty {
      /deep/ .el-empty__image {
        width: 95px;
      }
      /deep/ .el-empty__description p {
        color: #000;
      }
    }
  }

  .calendar {
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    border-radius: 5px;
    padding: 0;
    /deep/ .el-button {
      padding: 5px;
    }
    /deep/ .el-calendar-day {
      border: 0;
      height: 25px;
    }
  }
  .card-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px !important;
    cursor: pointer;
    span {
      font-size: 14px;
    }
  }
}
</style>
