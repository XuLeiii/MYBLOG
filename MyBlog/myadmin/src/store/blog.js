import { addBlog, getBlogs, updateBlog,deleteBlog } from "../api/api";

const state = {
  blogs: [],
};

const mutations = {
  BLOGS(state, blogs) {
    state.blogs = blogs;
  },
  BLOG(state, blog) {
    state.blog = blog;
  },
};

const actions = {
  //新增博客
  async addBlog(state, data) {
    return await addBlog(data);
  },
  //查询全部博客
  async getBlogs({ commit }) {
    let result = await getBlogs();
    if (result.status == 200) {
      commit("BLOGS", result.data.data);
    } else {
      console.log(result);
    }
  },
  // 更新博客
  async updateBlog({ commit }, data) {
    return await updateBlog(data);
  },
  // 删除博客
  async deleteBlog({ commit }, data) {
    return await deleteBlog(data);
  },
};

const getters = {
  blogs(state) {
    return state.blogs;
  },
};

export default { actions, state, mutations, getters };
