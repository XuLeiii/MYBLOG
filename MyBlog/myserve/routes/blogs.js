var express = require("express");
var router = express.Router();
var articleController = require("../controllers/blogs");

router.post("/addblog", articleController.addBlog);

router.delete("/deleteblog", articleController.deleteBlog);
router.post("/updateblog", articleController.updateBlog);
router.get("/getblogs", articleController.getBlogs);

router.get("/getpublishblogs", articleController.getPublishBlogs);
router.get("/getblog", articleController.getBlog);
router.get("/addfavour", articleController.addFavour);
router.get("/addblogbrowse", articleController.addBlogBrowse);
router.get('/getblogsofclassify', articleController.getBlogsOfClassify);

module.exports = router;
