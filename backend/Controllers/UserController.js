const User = require("../Models/userModel");
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const authenticationToken = require('../middlewares/authenticationMiddleware');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaitleyvriti@gmail.com",
    pass: "ojayoenzwgvxonpp",
  },
});


exports.register = async (req, res) => {
  const { username, email, password, isPrivate } = req.body;
  try {
    if (!email=='String' || !password =='String'|| !username=='String') {
      return res.status(400).json("enter all the fields correctly please");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const documentLength = await User.countDocuments();
    if (documentLength == 0) {
      const newUserInstance = new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: "admin",
        isPrivate: 'false',
      });
      await newUserInstance.save();
      return res.status(201).json(`${username} saved successfully`);
    }

    const newUserInstance = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: "user",
      isPrivate: 'false',
    });
    await newUserInstance.save();
    return res.status(201).json(`${username} is registered`);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.login = async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({ email: email });
  

  if(!user){
    return res.json(` user doesn't exist`);
  }
  const verifyPassword = await bcrypt.compare(password, user.password);
  if(!verifyPassword){
    return res.status(301).json("wrong password");
  }
  const token = jwt.sign({id:user._id},process.env.secretkey,{expiresIn:'15m'});
  const refreshToken = jwt.sign({id:user._id}, process.env.refreshkey, {expiresIn:'7d'});

  res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"Strict",
    maxAge:15*60*1000 //15 minutes
  })

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"Strict",
    maxAge:7*24*60*60*1000 //7 days
  })

  return res.status(200).json(`${user.username} logged in`);
}

exports.updateUser= async (req,res)=>{
    try{
    const {username, id} = req.user;

    const existingUser = await User.findById(id);
    
    if(!existingUser){
      return res.status(400).json(`${username} doesn't exist`);
    }
    
    const {email,password,isPrivate} = req.body;
    if (!email || !password || !username) {
        return res.status(400).json("enter all the fields correctly");
      }

      const hashedPassword = await bcrypt.hash(password,10);

     
    await User.findOneAndUpdate(
      {_id: id}, {username: username, email: email, password: hashedPassword, isPrivate: isPrivate}, {new: true}
    );

    return res.status(200).json(`"${username} updated successfully !!`)
    
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }   
}

exports.resetPassword = async(req,res)=>{
  try{
    const existingUser = req.user;
    console.log(existingUser);
    
    if(!existingUser){
      return res.status(400).json("User doesn't exist");
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(resetToken);
    
    await User.findByIdAndUpdate(req.user.id,{resetPasswordToken:hashedToken, resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000)}, {new:true});

    const mailOptions={
      from:"jaitleyvriti@gmail.com",
      to: `${existingUser.email}`,
      subject:"Password reset link",
      text:`This is your password reset link ${existingUser.username}
      
      Click on the link to verify and reset your password:
      http://localhost:3001/reset-password/${resetToken}
      Thank you :D`
    };
    transporter .sendMail(mailOptions);
    return res.status(200).json("link sent successfully");

  }catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
}

exports.verifyToken = async(req,res)=>{
  try{
    const {token,newPassword} = req.body;
    if(!token || !newPassword) return res.status(400).json("Token and new password required!!");

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken);

    const existingUser = await User.findOne({
      resetPasswordToken:hashedToken,
      resetPasswordExpires:{$gt:Date.now()}
    });
    console.log(existingUser);

    if(!existingUser) return res.status(400).json("Invalid or expired token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      {resetPasswordToken:hashedToken},
      {password:hashedPassword, 
        //used unset to remove these fields from mongodb - used with fineOneAndUpdate
      $unset: {
      resetPasswordExpires: "",
      resetPasswordToken: ""
      }
    }, {new:true}
    );

    return res.status(200).json("Password reset successfully!!");
  }catch(err){
    return res.status(500).json(err);
  }
}




