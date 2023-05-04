import Vuex from "vuex";
import Vue from "vue";
// 引入深色主题仓库
import theme from "./theme";
import synthesis from "./synthesis";

Vue.use(Vuex);
export default new Vuex.Store({
  // Vuex的模块化开发
  modules: {
    theme,
    synthesis,
  },
});
