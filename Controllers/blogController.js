const blog = require('../Models/blogModel');
const cloudinary = require('../config/cloudinary');

exports.createBlog = async (req,res)=> {
    const {title,content, published} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    if(!title||!content ||typeof(content) != 'string'||typeof(title)!='string'){
        return res.status(400).json("enter all the fields correctly");
    }
    const existingBlog = await blog.findOne({title});
    if(existingBlog){
        return res.status(400).json("Blog already exists, cant upload it again");
    }
        const newBlog = new blog({
            title:title,
            fileUrl: result.secure_url,
            content:content,
            likes:0,
            comments:0,
            published:true
        })

        await newBlog.save();    
        return res.status(201).json(`blog with title : ${title} is created`);                                     
}

exports.updateBlog = async (req,res)=>{
    try{
    const id = req.params._id;
    const {title,content,published} = req.body;
    const existingBlog = await blog.findById(id);
    console.log(existingBlog);
    
    if(!existingBlog){
        return res.status(400).json("Blog doesn't exist, please check again");
    }

    await blog.findOneAndUpdate({_id:id},{        
        title:title,
        content:content,
        likes:0,
        comments:0,
        published:published}, {new:true} );
    return res.status(200).json(`${title} updated successfully`);
}catch(error){
    res.status(500).json(error);
}
}


