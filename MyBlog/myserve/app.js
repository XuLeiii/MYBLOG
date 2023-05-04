var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//1.引入路由
const usersRouter = require("./routes/users");
const arrticlesRouter = require("./routes/blogs");
const classifiesRouter = require("./routes/classifies");
const db = require("./db/connect");
const photoRouter = require("./routes/photo");
const synthesisRouter = require("./routes/synthesis");

//2.处理跨域问题

var app = express();

app.use(require("cors")());
//视图配置
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 注册路由(接收客户端发来的地址请求)
app.use("/api/users", usersRouter);
app.use("/api/blogs", arrticlesRouter);
app.use("/api/classifies", classifiesRouter);
app.use("/api/photo", photoRouter);
app.use("/api/synthesis", synthesisRouter);

// catch 404 and forward to error handler
//捕获404错误，并调用错误处理程序
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
//错误处理程序
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //设置变量，只在开发环境提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  //渲染错误界面
  res.status(err.status || 500);
  res.render("error");
});

// app.listen(3000, () => {
//   console.log(`Example app listening at 3000`);
// });

module.exports = app;
