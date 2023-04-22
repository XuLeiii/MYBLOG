<template>
  <div class="manage-box">
    <HeaderH class="header"></HeaderH>
    <div class="main-box">
      <NavN class="nav"></NavN>
      <router-view class="routerbox"></router-view>
    </div>
  </div>
</template>

<script>
import HeaderH from "../components/HeaderH.vue";
import NavN from "../components/NavN.vue";

export default {
  components: { HeaderH, NavN},
}
</script>

<style lang="less" scoped>
.manage-box {
  // width: 99vw;
  height: 95vh;
  .header {
    width: 100%;
    height: 60px;
    background-color: #3c3c3c;
  }

  .main-box {
    // width: 100vw;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav {
      height: 100%;
      width: 200px;
      // background-color: green;
    }
    .routerbox {
      height: 100%;
      width: 100%;
      // background-color: pink;
    }
  }
}
</style>
