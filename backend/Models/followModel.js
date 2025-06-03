const mongoose = require('mongoose');
const followSchema = new mongoose.Schema({
    senderID:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    recieverID:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    status:{
        type:String,
        require:true
    }
}, {timestamps:true}) 

module.exports= mongoose.model("follow", followSchema); 