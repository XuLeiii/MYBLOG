import axios from "axios";
// import store from "../store";

// 二次封装axios
const requests = axios.create({
  //配置基础路径
  baseURL: "http://localhost:3000/api",
  //请求超时时间限制
  timeout: 5000,
});

// // 请求拦截器：在请求发出去之前做处理
// requests.interceptors.request.use(
// 	config => {
// 		// config:配置对象，对象信息里边有一个重要信息，请求头headers
// 		// nprogress.start();
// 		// // 需要携带token带给服务器
// 		if (store.state.user.token || localStorage.getItem("TOKEN")) {
// 			config.headers.token = store.state.user.token;
// 		}
// 		return config;
// 	},
// 	error => {
// 		//请求错误时
// 		console.log("request:", error);
// 		// 1.判断请求超时
// 		if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
// 			console.log("timeout请求超时");
// 			// return service.request(originalRequest); // 再重复请求一次
// 		}
// 		return Promise.reject(error);
// 	}
// );
// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    // nprogress.done();
    console.log("res.data", res.data);
    return res
  },
  (err) => {
    // nprogress.done();
    //console.log('response:',err)
    // 1.判断请求超时
    if (err.code === "ECONNABORTED" && err.message.indexOf("timeout") !== -1) {
      return Promise.reject("timeout请求超时");
      // return service.request(originalRequest);// 再重复请求一次
    }
    if (err.message.indexOf("Network") !== -1) {
      return Promise.reject("网络异常");
    }
    if (err.response && err.response.status === 404) {
      return Promise.reject("请求的资源无法找到");
    } else if (err.response && err.response.status === 500) {
      return Promise.reject("服务器繁忙");
    }
    console.log(err.response.status);
    return Promise.reject(err);
  }
);

export default requests;
