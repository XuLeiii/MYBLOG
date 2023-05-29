import { login, register } from "../api/api.js";
const state = {
  token: "",
};

const actions = {
  // 用户登录
  async login(state, data) {
    let result = await login(data);
    console.log(result);
    if (result.data.status == 200) {
      // setUserInfo(result.data.user);
      sessionStorage.setItem("TOKEN", JSON.stringify(result.data.data.token));
      state.token = result.data.data.token;
      return result;
      // console.log(result.data.user,"123",result.data.token);
    } else {
      return result;
    }
  },
  //2,用户注册，向后端服务器发送请求
  async register(state, data) {
    let result = await register(data);
    //测试result是否接受到经由响应拦截器返回的后端的数据
    console.log("这里接收到返回参数的result", result);
    return result.data;
  },
};

export default {
  actions,
  state,
};
