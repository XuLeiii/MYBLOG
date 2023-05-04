<template>
  <div id="app" :class="'light'">
    <Header />
    <SliderShow />
    <!-- 中间主栏(list组件) -->
    <div id="mainContainer">
      <!-- 1.侧边导航 -->
      <NavN></NavN>
      <!-- 2.动态加载的路由界面 -->
      <router-view class="main-box"></router-view>
      <!-- 3.右边侧边栏 -->
      <SiderInfo></SiderInfo>
    </div>
    <FooterF />
  </div>
</template>

<script>
import Header from "./components/HeaderH.vue";
import FooterF from "./components/FooterF.vue";
import NavN from "./components/NavN.vue";
import SliderShow from "./components/SlideShow.vue";
import SiderInfo from "./components/SiderInfo.vue";

import { mapGetters, mapState } from "vuex";
import { createFingerprint } from "../src/utils/index.js";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    FooterF,
    NavN,
    SliderShow,
    SiderInfo,
  },
  computed: {
    //引入深色主题中的变量
    ...mapState({
      isLight: (state) => state.theme.isLight,
    }),
    ...mapGetters(["color", "infoBgColor", "mainBg"]),
  },
    created() {
    // 取本机主指纹操作
    if (!localStorage.getItem("browserId")) {
      createFingerprint();
    }
  },
};
</script>

<style lang="less">
* {
  border: 0;
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
}
body {
  overflow: auto;
}
#app {
  background-size: 100% 100%;
  background-attachment: fixed;
  // height: 100vh;
}

#mainContainer {
  box-sizing: border-box;
  padding-left: 10vw;
  padding-right: 9vw;
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  color: #000;
  .main-box {
    width: 48vw;
    height: 1500px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    margin: 5px 5px;

  }
}

.night {
  background: url("./assets/img/nightBg.jpg") no-repeat;
}
.light {
  background: url("./assets/img/lightBg.jpg") no-repeat;
}
</style>
