const express = require('express');
const { createBlog, updateBlog, getAllBlogs } = require('../Controllers/blogController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const upload  = require('../middlewares/multer');
const router = express.Router();

router.post("/createBlog", authenticationToken, upload.single('image'), createBlog);
router.post("/updateBlog/:_id",  authenticationToken, updateBlog); 
router.get("/getBlogs", getAllBlogs);

module.exports = router;
