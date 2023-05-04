<template>
  <div class="list-box">
    <div class="list-tip">
      <h2>{{ this.tipText }}</h2>
    </div>
    <el-card
      class="card"
      shadow="hover"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <div class="hover-evernt" @click="articleDetail(item._id)">
        <h3>{{ item.title }}</h3>
        <p>{{ item.digest }}</p>
      </div>
      <div class="footer">
        <div class="lfooter">
          <i class="el-icon-view">123</i>
          <i class="iconfont icon-rili"> sdsad</i>
        </div>
        <div class="rfooter">
          <i>日期:{{ item.date }}</i>
        </div>
      </div>
    </el-card>
    <el-empty
      v-if="dataList.length == 0"
      description="先去别的地方看看吧！"
    ></el-empty>
  </div>
</template>

<script>
import { getPublishBlogs, getBlogsOfClassify } from "../api/api.js";
export default {
  data() {
    return {
      // 页数
      page: 1,
      // 当前分页开始
      pageStart: 0,
      // 每页数量
      pageSize: 5,
      dataList: [],
      tipText: "博客",
    };
  },
  methods: {
    articleDetail(id) {
      console.log("1", id);
      this.$router.push({ path: "/article", query: { id: id } });
    },
    // 获取博客列表数据
    async getDatas(pageStart, pageSize) {
      try {
        // 获取博客列表
        let res = null;
        //获取路由跳转(push)时携带的参数，是个对象。
        const { classification, searchValue } = this.$route.query;
        console.log("luyou", this.$route.query);
        // 判断发什么请求博客
        if (classification) {
          this.tipText = `${classification}下的博客`;
          res = await getBlogsOfClassify({ classification }); //根据专栏id去查找该id下的博客
        } else if (searchValue) {
          this.tipText = "搜索结果";
          // 发送axios请求,携带查询的关键字(字符串)，接收后台返回的数据(数组对象)
          res = await this.$api.search({ searchValue });
        } else {
          this.tipText = "博客";
          res = await getPublishBlogs({ pageStart, pageSize });
          console.log(res);
        }
        // 接收服务器的数据，并执行相关后续操作
        if (res.status === 200) {
          this.dataList = res.data.dataList || [];
          this.count = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
  mounted() {
    this.getDatas(this.pageStart, this.pageSize);
  },
};
</script>

<style scoped lang="less">
.list-box {
  .list-tip {
    text-align: center;
    background-color: rgba(255, 255, 255, 1);
    line-height: 40px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .card {
    height: 120px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    /deep/ .el-card__body {
      padding: 15px;
    }
    p {
      line-height: 45px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      .lfooter {
        i {
          margin-left: 5px;
        }
        .rfooter {
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
