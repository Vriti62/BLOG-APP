const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    blogID:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
})

module.exports = mongoose.model("like",likeSchema);