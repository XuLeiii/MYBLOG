//加密密码
const bcrypt = require("bcryptjs");

exports.hash = (myPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(myPassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
//传入明文密码经过处理和hash化的密码比较
exports.compare = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result);
    });
  });
};
//格式化数据库中的时间
exports.formatDate = (dateNum) => {
  if (!dateNum) {
    return dateNum;
  }
  const date = new Date(dateNum);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // return (y < 10 ? '0' + y : y) + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
  return (
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day)
  );
};

exports.imgBaseUrl = (type) => {
  switch (type) {
    case "avatar":
      return "http://127.0.0.1:3000/avatars/";
    case "image":
      return "http://127.0.0.1:3000/images/";
    case "photo":
      return "http://127.0.0.1:3000/photos/";
  }
};
/**
 *删除图片
 * @param {*} imgUrl
 */
exports.deleteImg = function (imgUrl) {
  const imgName = imgUrl.substr(imgUrl.indexOf("avatars/") + 7);
  const url = path.join(__dirname, "../public/avatars", imgName);
  console.log(url, "url");
  //判断给定的路径是否存在
  if (fs.existsSync(url)) {
    //返回文件和子目录的数组
    // files = fs.readdirSync(url);

    // files.forEach(function (file, index) {
    // 	// var curPath = url + "/" + file;
    // 	var curPath = path.join(url, file);
    // 	//fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
    // 	if (fs.statSync(curPath).isDirectory()) {
    // 		// recurse
    // 		deleteFolderRecursive(curPath);

    // 		// 是文件delete file
    // 	} else {
    // 		fs.unlinkSync(curPath);
    // 	}
    // });
    //清除文件
    fs.unlinkSync(url);
  } else {
    console.log("给定的路径不存在，请给出正确的路径");
  }
};
// 处理数据面板数据
exports.manangeDataBoard = (blogs) => {
  const map = new Map();
  const now = Date.now();
  const savenDaysAgo = this.formatDate(now - 7 * 24 * 3600 * 1000);

  (blogsOf7 = Array(7).fill(0)),
    blogs.forEach((blog) => {
      const date = this.formatDate(blog.date);
      if (date >= savenDaysAgo) {
        for (let i = 1; i <= 7; i++) {
          if (date >= this.formatDate(now - i * 24 * 3600 * 1000)) {
            blogsOf7[i]++;
            break;
          }
        }
      }
    });
  return { blogsOf7 };
};
