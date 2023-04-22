var express = require("express");
var router = express.Router();
var articleController = require('../controllers/blogs');

router.post('/addblog', articleController.addBlog);
module.exports = router;
