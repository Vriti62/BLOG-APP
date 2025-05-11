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
    comments:{
        type:String,
        required:true
    }
}, {timestamps:true});
module.exports = mongoose.model('comment', commentSchema);


