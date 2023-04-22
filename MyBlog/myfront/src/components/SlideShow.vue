<template>
  <div id="slideshow-box">
    <!-- 走马灯 -->
    <el-carousel
      class="cart-img"
      direction="vertical"
      indicator-position="none"
      height="100%"
    >
      <el-carousel-item v-for="item in slideBg" :key="item">
        <img :src="item" alt="加载失败" />
      </el-carousel-item>
    </el-carousel>
    <!-- 个人信息卡片 -->
    <el-card class="info" style="background-color: rgba(255, 255, 255, 0.6)">
      <img src="../assets/img/infoBg.jpg" alt="" />
      <el-avatar class="avatar" :src="AVATAR" :size="50"></el-avatar>
      <div class="my-name">白开水很烫</div>
      <div class="info-detail">
        <div>博客<span>0</span></div>
        <div>心情<span>0</span></div>
        <div>专栏<span>0</span></div>
        <div>标签<span>0</span></div>
      </div>
    </el-card>
    <!-- 底部小字 -->
    <div class="tip">欢迎来到白开水很烫的博客</div>
  </div>
</template>

<script>
import AVATAR from "../assets/img/avatar.jpg";
import slideBgUrl1 from "../assets/img/slideBg/slidebg1.jpg";
import slideBgUrl3 from "../assets/img/slideBg/slidebg2.jpg";
import slideBgUrl4 from "../assets/img/slideBg/slidebg3.jpg";
export default {
  data() {
    return {
      AVATAR,
      slideBg: [slideBgUrl1, slideBgUrl3, slideBgUrl4],
    };
  },
};
</script>

<style scoped lang="less">
#slideshow-box {
  height: 45vh;
  width: 80vw;
  margin-left: 10vw;
  margin-top: 50px;
  border-radius: 10px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  // transition: 0.6s;
  .cart-img {
    height: 42vh;
    border-radius: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  // 头像卡片
  .info {
    position: absolute;
    width: 13vw;
    height: 200px;
    border: 0px;
    left: 5%;
    bottom: 2%;
    border-radius: 10px;
    z-index: 2;

    img {
      width: 100%;
      height: 90px;
      border-radius: 10px;
    }
    /deep/ .el-card__body {
      padding: 0;
    }
    // 头像
    .avatar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: 28%;
    }
    .my-name {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
    }
    .info-detail {
      display: flex;
      height: 50px;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-top: 5px;
        }
      }
    }
  }
  // 底部小字
  .tip {
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }
}
@media screen and (max-width: 1000px) {
  #slideshow-box {
    height: 35vh;
    font-size: 12px;
    .cart-img {
      height: 32vh;
    }
    .info {
      width: 140px;
    }
  }
}
</style>
