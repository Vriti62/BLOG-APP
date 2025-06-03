const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    BlogID:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'blog'
    },
    UserID:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    text:{
        type:String,
        required:true
    },
    parentCommentId:{
        type:mongoose.Schema.ObjectId,
        default:null,
        ref:'comment'
    }
}, {timestamps:true});
module.exports = mongoose.model('comment', commentSchema);


