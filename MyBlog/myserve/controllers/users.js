//1.引入model中的users,该文件下的js文件负责对数据库增删改查
const UserModel = require("../model/users");
//2.引入工具类？有啥用？
//hash方法用来加密前端传来的密码
const { hash, compare, sign } = require("../utils");

//1.登录操作
const login = async (req, res, next) => {
  let { email, password } = req.body;
  console.log(email, password);
  let user = await UserModel.getUser(email);

  if (user) {
    console.log("用户存在则返回的值为:", user);
    let { password: hash } = user;
    let compareResult = await compare(password, hash);
    if (compareResult) {
      const token = sign(email);
      res.send({
        msg: "登录成功",
        status: 200,
        data: { token: token },
      });
    } else {
      res.send({
        msg: "密码错误",
        status: 0,
      });
    }
  } else {
    res.send({
      msg: "邮箱信息不存在",
      status: 0,
    });
  }
};

//2.注册操作
const register = async (req, res, next) => {
  //测试前端到后端传送数据是否畅通
  console.log("req.body", req.body);
  let { username, password, email, role } = req.body;
  //加密密码
  const bcryptPassword = await hash(password);
  //检查邮箱是否已被注册
  const Email = await UserModel.getUser(email);
  if (!Email) {
    //向数据库中添加注册信息,并接收响应信息
    let result = await UserModel.addUser({
      username,
      password: bcryptPassword,
      email,
      date: Date.now(),
      role,
    });
    //若result不为空则注册成功
    //那UserModel.addUser到底返回什么值呢？
    if (result) {
      res.send({
        msg: "注册成功",
        status: 200,
      });
    } else {
      res.send({
        msg: "注册失败！请检查信息",
        status: 0,
      });
    }
  } else {
    res.send({
      msg: "此邮箱已被注册，换个邮箱吧~",
      status: 0,
    });
  }
};
module.exports = {
  login,
  register,
};
