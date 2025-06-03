const mongoose = require('mongoose');
const Like = require("../Models/likeModel");

exports.likeBlog=async (req,res)=>{
        try {
            const currentUser = req.user; 
            const currentBlogID = req.params._id;   
            console.log(currentBlogID);

            const existingLike = await Like.findOne({
                blogID: currentBlogID,
                userID: currentUser._id,

            })
            console.log("Existing like: " , existingLike);
    
            if (existingLike) {
                await Like.deleteOne(existingLike);
                return res.status(400).json("Like removed");
            }

            const likeInstance = new Like({
                blogID: currentBlogID,
                userID: currentUser._id,

            })
            console.log("likeinstance: ", likeInstance);
    
            await likeInstance.save();

            const totalLikes = await Like.countDocuments({blogID: currentBlogID})
            console.log(totalLikes);

            return res.status(200).json({
                message: "Post liked",
                totalLikes: totalLikes
            });
        } catch (error) {
             res.status(400).json(error);
        }
    };

exports.getLikes = async (req, res) => {
    try {
        const blogID = req.params.blogID;

        // Validate blogID
        if (!mongoose.Types.ObjectId.isValid(blogID)) {
            return res.status(400).json({ error: "Invalid blogID format" });
        }

        const blogLikes = await Like.find({ blogID: new mongoose.Types.ObjectId(blogID) })
            .populate('userID', 'username'); 

        if (!blogLikes || blogLikes.length === 0) {
            return res.status(404).json({ message: "No likes found for this blog" });
        }

        console.log(blogLikes);
        return res.status(200).json(blogLikes);
    } catch (err) {
        console.error("Error fetching likes:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};