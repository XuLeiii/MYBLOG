<template>
  <!-- 主体瀑布流区域，无限滚动 -->
  <div class="photo-wall" ref="photoWall" infinite-scroll-distance="10">
    <div
      v-for="(cart, index) in carts"
      :key="index"
      :style="{
        top: cart.top + 'px',
        left: cart.left + 'px',
      }"
      class="photo-wall-item"
    >
      <!-- 图片懒加载 -->
      <el-image
        :src="cart.photoUrl"
        class="image"
        :key="cart.photoUrl"
        lazy
        :style="{ width: photoWidth + 'px', height: cart.photoHeight + 'px' }"
      >
      </el-image>
      <div class="time">{{ cart.shootingTime }}</div>
    </div>
    <!-- <input type="file" /> -->
    <div></div>
  </div>
</template>

<script>
import { getPhotos } from "../api/api.js";
export default {
  data() {
    return {
      c: "#000",
      //存放计算好的数据
      carts: [],
      //每一列的宽度
      photoWidth: 0,
      //多少列
      waterFallPhotoCol: 3,
      //左边距margin-left
      photoLeft: 5,
      //下边距margin-bottom + 卡片时间显示区域高度
      cartBottom: 40,
      //存放瀑布流各个列的高度
      deviationHeight: [],
      currentPage: 1,
      //是否还有数据
      noMore: false,
    };
  },
  mounted() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      console.log("4");
      const res = await getPhotos();
      console.log("5");
      console.log("res", res);
      if (res.status == 200) {
        this.carts = res.data;
      }
      this.calculationWidth();
    },
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      let domWidth = this.$refs.photoWall.offsetWidth;
      this.photoWidth = parseInt(
        (domWidth - 30 - this.photoLeft * (this.waterFallPhotoCol + 1)) /
          this.waterFallPhotoCol
      );
      //初始化偏移高度数组
      this.deviationHeight = new Array(this.waterFallPhotoCol).fill(5);
      this.imgPreloading();
    },
    //图片数据处理
    imgPreloading() {
      let len = this.carts.length;
      let { photoWidth, photoLeft, deviationHeight, cartBottom } = this;
      for (let i = 0; i < len; i++) {
        let aImg = new Image();
        aImg.src = this.carts[i].photoUrl;
        aImg.onload = aImg.onerror = () => {
          this.$set(
            this.carts[i],
            "photoHeight",
            parseInt((this.photoWidth / aImg.width) * aImg.height)
          );
          let minIndex = deviationHeight.indexOf(
            Math.min.apply(null, deviationHeight)
          );
          this.$set(this.carts[i], "top", deviationHeight[minIndex]);
          this.$set(
            this.carts[i],
            "left",
            minIndex == 0
              ? photoLeft
              : minIndex * (photoLeft + photoWidth + 10) + photoLeft
          );
          deviationHeight[minIndex] += this.carts[i].photoHeight + cartBottom;
        };
      }
    },
  },
};
</script>

<style scoped lang="less">
.photo-wall {
  overflow: scroll;
  position: relative;
  .photo-wall-item {
    position: absolute;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    transition: 0.6s;
    background-color: rgb(255, 255, 255);

    .time {
      padding-right: 5px;
      text-align: right;
      font-size: 14px;
      color: #000000;
    }
  }
  .photo-wall-item::after {
    clear: both;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0;
}
</style>
