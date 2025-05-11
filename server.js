const express = require('express');
const app = express();
app.use(express.json());
const port = 3001;
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const user= require("./routes/user.routes");
const admin= require("./routes/admin.routes");
const blog = require("./routes/blog.routes");
const like = require("./routes/like.routres");
const follow = require("./routes/follow.routes");
const chatbot = require("./routes/chatbot.routes");
const refreshToken  = require('./routes/auth.routes');
const comment = require('./routes/comment.routes');


mongoose.connect('mongodb://localhost:27017/test').then(()=>console.log("Connected"))
.catch(err=>console.error("MongoDB connection error:", err));
app.use(cookieParser())

app.use("/user", user);
app.use("/admin", admin);
app.use("/blog", blog);
app.use("/like", like);
app.use("/comment", comment);
app.use("/follow", follow);
app.use("/chatbot", chatbot);
app.use("/", refreshToken);

app.listen(port,(req,res)=>{
    console.log(`Server is running at ${port}`);
})
