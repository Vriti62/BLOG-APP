const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        default:"user"
    },
    isPrivate:{
        type:Boolean,
        required:true,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
    
}, {timestamps:true})

module.exports = mongoose.model("user", userSchema);