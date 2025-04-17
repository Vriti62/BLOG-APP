const mongoose= require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Number, 
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    published:{
        type:Boolean,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("blog", blogSchema);
