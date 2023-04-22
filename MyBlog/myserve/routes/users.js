var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users");

/* GET users listing. */

router.post("/login", usersController.login);
router.post("/register", usersController.register);

module.exports = router;
