//各种axios请求的方法写在这里

import requests from "./request";

//登录用户
export const login = (data) => {
  requests.post("/users/login", data);
  //测试vuex到api请求是否畅通
  // console.log("data",data);
};
//注册用户
export const register = (data) => requests.post("/users/register", data);
//测试从login.vue组件到此是否畅通
// console.log("data",data);

//新增文章
export const addBlog = (data) => requests.post("/blogs/addblog", data);
//修改文章
export const updateBlog = (data) => requests.post("/blogs/updateblog", data);
//查询全部文章
export const getBlogs = () => requests.get("/blogs/getblogs");
// 删除文章
export const deleteBlog = (params = {}) =>
  requests.delete("/blogs/deleteblog", { params });

//新增专栏
export const addClassify = (data) =>
  requests.post("/classifies/addclassify", data);
//删除专栏
export const deleteClassify = (params) =>
  requests.delete("/classifies/deleteclassify", { params });
//修改专栏
export const updateClassifyTitle = (data) =>
  requests.post("/classifies/updateclassifytitle", data);
//查询专栏列表
export const getClassifies = () => requests.get("/classifies/getclassifies");

// 获取所有照片信息
export const getPhotos = () => requests.get("/photo/getphotos");
// 修改照片信息
export const updatePhotos = (data) =>
  requests.post("/photo/updatephotodigest", data);
// 删除照片信息
export const deletePhoto = (params) =>
  requests.delete("/photo/deletephoto", { params });
// 新增照片信息
export const addPhoto = (data) => requests.post("/photo/addphoto", data);

// 添加图片
export const uploadImg = (data) =>
  requests.post("/synthesis/uploadartimg", data, {
    headers: { "content-type": "multipart/form-data" },
  });

export const getDataForDataBoard = () =>
  requests.get("/synthesis/getdatafordataboard");
