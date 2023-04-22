const mongoose = require("mongoose");
// console.log(mongoose);

//1.定义了一个叫userschema的数据库，规定其中表的结构
const UserSchema = new mongoose.Schema({
  //定义表的结构
  username: { type: String, require: true },
  password: { type: String, require: true },
  date: { type: Date },
  email: { type: String, require: true },
  avatarUrl: { type: String },
  role: { type: String, require: true, default: "普通用户" },
});

//决定了这个数据库中的表的结构，
//usermodel是个构造函数，构造函数中有对数据的CURD方法，接受一个前端传来的数据作为参数
//new出来的实例对象用来存储的数据。
const UserModel = mongoose.model("user", UserSchema);

//查找用户 通过邮箱查找数据库中是否存在此用户，如果不存在则返回null,存在则返回为真
const getUser = (email) => {
  return UserModel.findOne({ email });
};

//注册用户
const addUser = (data) => {
  const user = new UserModel(data);
  console.log("data",data);
  //调用save方法，将数据存入库中
  return user
    .save()
    .then(() => true)
    .catch(() => false);
  //return new UserModel(data).save().then(()=>true).catch(()=>false)
};
module.exports = {
  getUser,
  addUser,
};
