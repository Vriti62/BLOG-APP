 const User = require("../Models/userModel");
 const bcrypt = require("bcrypt");
 const authenticationToken = require('../middlewares/authenticationMiddleware');
 const cookie = require('cookie-parser');
 const jwt = require('jsonwebtoken');
 const { paginationResults } = require("../middlewares/paginatedResults");
 const secretkey = "VRITI_JAITLEY"
 
exports.createAdmin = async (req, res) => {
    try{
    const user = req.user;
    if(user.role!=='admin'){
        return res.status(401).json(`${user.username} is not authorized`);
    }
    const {username, email, password, isPrivate} = req.body;
    if (!email || !password || !username) {
        return res.status(400).json("enter all the fields correctly");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json(`${user.username} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
        username:username,
        email:email,
        password:hashedPassword,
        role:'admin',
        isPrivate:isPrivate
    })

    await newAdmin.save();
    return res.status(200).json(`${newAdmin.username} is created`);


    }catch(error){
        res.status(500).json(error);
    }

 };
 
 exports.getUsers=async (req,res)=>{
    try{        
        return res.status(200).json(res.paginationResults);
    }catch(err){
        return res.status(500).json(err);
    }
 }