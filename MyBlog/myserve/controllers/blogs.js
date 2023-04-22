const BlogsModel = require('../model/blogs');

const addBlog = async (req, res) => {
	const { title, classification, content, digest, state, tags } = req.body;
	console.log("req.body",req.body);
    const blog = await BlogsModel.addblog({
		date: Date.now(),
		title,
		classification,
		content,
		digest,
		state,
	});
	console.log("bloggggggggg",blog);
    if(blog){
        res.send({
            msg:"博客添加成功",
            status:200
        })
    }else{
        res.send({
			msg: '博客添加失败！',
			status: 0,
		});
    }
}

module.exports ={
    addBlog
}