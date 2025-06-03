const blog = require('../Models/blogModel');
const cloudinary = require('../config/cloudinary');

exports.createBlog = async (req,res)=> {
    const {title,content, published} = req.body;

    if(!title||typeof title!= 'string' ||!content || typeof(content)!='string' || !published || typeof published !== 'string'){
        return res.status(400).json("Please check all the fields again");
    };

    const result = await cloudinary.uploader.upload(req.file.path);
    if(!result) return res.status(400).json("Failed to upload to cloudinary");

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

    if(!title||typeof title!= 'string' ||!content || typeof(content)!='string' || !published || typeof published !== 'string'){
        return res.status(400).json("Please check all the fields again");
    };

    const existingBlog = await blog.findById(id);
    console.log(existingBlog);
    
    if(!existingBlog){
        return res.status(400).json("Blog doesn't exist, please check again");
    }

    const updateBlog = await blog.findOneAndUpdate(
        {_id:id},
        {title:title,
        content:content,
        likes:0,
        comments:0,
        published:published}, {new:true} );

    return res.status(200).json({message:`${title} updated successfully`, blog: updateBlog});
}catch(error){
    res.status(500).json(error);
}
}


