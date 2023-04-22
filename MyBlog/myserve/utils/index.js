//加密密码
const bcrypt = require("bcryptjs")

exports.hash = myPassword => {
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