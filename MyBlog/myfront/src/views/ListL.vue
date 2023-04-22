<template>
  <div class="list-box">
    <div class="list-tip">
      <h2>博客</h2>
    </div>
    <el-card class="card" shadow="hover">
      <div class="hover-evernt" @click="articleDetail()">
        <h3>文章标题</h3>
        <p>文章内容:啥都我就死我到家爱哦撒基地</p>
      </div>
      <div class="footer">
        <div class="lfooter">
          <i class="el-icon-view">123</i>
          <i class="iconfont icon-rili"> sdsad</i>
        </div>
        <div class="rfooter">
          <i>日期</i>
        </div>
      </div>
    </el-card>
    <el-card class="card">
      <h3>文章标题</h3>
      <p>文章内容</p>
      <div class="footer">
        <div class="lfooter">
          <i></i>
          <i></i>
        </div>
        <div class="rfooter">
          <i>riqi</i>
        </div>
      </div>
    </el-card>
    <el-card class="card">
      <h3>文章标题</h3>
      <p>文章内容</p>
      <div class="footer">
        <div class="lfooter">
          <i></i>
          <i></i>
        </div>
        <div class="rfooter">
          <i>riqi</i>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    articleDetail(){
      this.$router.push({path:"/article"})
    }
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
