const express = require('express');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');  
app.use(cookieParser()); 
const jwt = require('jsonwebtoken');
const User = require("../Models/userModel");
require('dotenv').config();

exports.authenticationToken=((req,res,next)=>{
    const token =  req.cookies['token'];
    // // console.log(req);
    
    // console.log(token);
    
    jwt.verify(token, process.env.secretkey, async (err,result)=>{
        if(result){
            const user = await User.findById(result.id);
            // console.log(user);
            if(user){
                req.user=user;
                // console.log(result);
                next();

            }
        }else{
        return res.status(400).json("not verified");
        }
    });
})
