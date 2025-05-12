/*needs- comments on blogs
         nested comments*/

const Comment = require('../Models/commentModel');
const blog = require('../Models/blogModel');

exports.addComment = async (req, res) => {
    try {
        const user = req.user.id; // Extract user ID from the authenticated user
        const blogId = req.params.id; // Extract blog ID from the request parameters
        const { comments } = req.body; // Extract the comments field from the request body

        // Validate the input
        if (!comments || typeof comments !== 'string') {
            return res.status(400).json("Invalid comment format. 'comments' must be a string.");
        }

        // Check if the blog exists
        const existingBlog = await blog.findById(blogId);
        if (!existingBlog) {
            return res.status(404).json("Blog doesn't exist.");
        }

    
        const newComment = new Comment({
            BlogID: blogId,
            UserID: user,
            comments: comments
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