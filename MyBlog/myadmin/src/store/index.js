import Vue from "vue";
import Vuex from "vuex";
import user from "./user.js";
import blog from "./blog.js"
Vue.use(Vuex);

//vuex模块化开发
export default new Vuex.Store({
  getters: {},
  modules: {
    user,
    blog
  },
});
