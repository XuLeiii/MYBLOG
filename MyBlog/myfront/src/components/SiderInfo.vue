<template>
  <div class="siderinfo-box">
    <!-- 1. -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-edit-outline" style="margin-right: 10px"></i>专栏
      </div>
      <div class="car-item"></div>
      <el-empty description="专栏在路上" :image-size="50"></el-empty>
    </el-card>
    <!-- 2 -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-price-tag" style="margin-right: 10px"></i>书签
      </div>
      <div class="car-item"></div>
      <el-empty description="书签还没来" :image-size="50"></el-empty>
    </el-card>
    <!-- 3 -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-medal" style="margin-right: 10px"></i>最新博客
      </div>
      <div class="car-item"></div>
      <el-empty description="你猜为什么没有？" :image-size="50"></el-empty>
    </el-card>
    <!-- 4 -->
    <el-card shadow="always" body-style="padding: 15px 10px;">
      <div class="card-head">
        <i class="el-icon-document" style="margin-right: 10px"></i>日历
      </div>
      <div class="car-item"></div>
      <el-empty description="无·博客" :image-size="50"></el-empty>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    height: 250px;
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
}
</style>
