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
