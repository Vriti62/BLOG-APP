/*needs- comments on blogs
         nested comments*/

const Comment = require('../Models/commentModel');
const blog = require('../Models/blogModel');
const { paginationResults } = require("../middlewares/paginatedResults");

exports.addComment = async (req, res) => {
    try {
        const user = req.user.id; 
        const blogId = req.params.id; 
        const { comments } = req.body; 

        if (!comments || typeof comments !== 'string') {
            return res.status(400).json("Invalid comment format. 'comments' must be a string.");
        }

        const existingBlog = await blog.find({blogId, parentCommentId:null}); //added a condition to check if its parent comment or not 
        if (!existingBlog) {
            return res.status(404).json("Blog doesn't exist.");
        }

        const newComment = new Comment({
            BlogID: blogId,
            UserID: user,
            text: comments
        })
        await newComment.save();

        const populatedComment= await Comment.findById(newComment._id).populate('UserID', 'username');
      
        return res.status(200).json({
            message:"Comment posted successfully!",
            comment:populatedComment
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

exports.replyComment = async (req, res) => {
    try{
    const user = req.user.id;
    const commentId = req.params.id;
    const {commentReply} = req.body;
    
        const existingComment = await Comment.findById(commentId);
        if (!existingComment) return res.status(400).json("comment doesn't exist. Please check");

    const reply = new Comment({
        BlogID: existingComment.BlogID,
        UserID:user,
        comments:existingComment.comments,
        parentCommentId:commentId,
        text:commentReply
    });

    await reply.save();
    const populatedReply = await Comment.findById(reply._id).populate('parentCommentId', 'text');

    return res.status(200).json({
        message:"replied successfully :D",
        reply:populatedReply
    });
    }catch(err){
        return res.status(400).json(err);
    }
}

exports.getComments = async(req,res)=>{
    try{
        return res.status(200).json(res.paginationResults);
    }catch(err){
        return res.status(500).json(err);
    }
}
