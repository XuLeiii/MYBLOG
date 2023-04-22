//各种axios请求的方法写在这里

import requests from "./request";

//1.点击登录按钮触发的登录请求
export const login = (data) => {
  requests.post("/users/login", data);
  //测试vuex到api请求是否畅通
  // console.log("data",data);
};

//2.注册用户
export const register = (data) => requests.post("/users/register", data);
//测试从login.vue组件到此是否畅通
// console.log("data",data);

//添加博客
export const addBlog = (data)=>requests.post( "/blogs/addblog",data)