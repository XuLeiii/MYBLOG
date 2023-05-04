const state = {
  blogs: [],
  blogsOfClassify: [],
  classifies: [],
  searchs: [],
};
const getters = {};
const mutations = {
  SAVEBLOG(state, blogs) {
    state.blogs = blogs;
  },
  SAVEBLOGSOFCLASSIFY(state, blogsOfClassify) {
    state.blogsOfClassify = blogsOfClassify;
  },
  SAVECLASSIFIES(state, classifies) {
    state.classifies = classifies;
    console.log("state.classifies", state.classifies);
  },
  SAVESEARCHLIST(state, searchs) {
    state.searchs = searchs;
  },
};
const actions = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
