//endpoint for refresh token
const jwt = require('jsonwebtoken');
const user = require('../Models/userModel')

exports.refreshToken= (req,res) => {
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken);
    if(!refreshToken) return res.status(403).json("Invalid or expired token");

    jwt.verify(refreshToken, process.env.refreshkey, async (err,result)=>{
            if(err) return res.status(404).json(err);

            const User = await user.findById(result.id);
            console.log(User);
            if(!User) return res.status(400).json("User not found");
            
            const newAccessToken = jwt.sign({id:user._id}, process.env.secretkey, {expiresIn:"15m"});

            res.cookie("refreshToken", newAccessToken,{
                httpOnly:true,
                secure:true,
                sameSite:"Strict",
                maxAge:15*60*1000
            });
            return res.status(200).json("token refreshed successfully!")
    })
}