const express = require('express');
const { createBlog, updateBlog } = require('../Controllers/blogController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post("/createBlog", authenticationToken, createBlog);
router.post("/updateBlog/:_id", authenticationToken, updateBlog); 

module.exports = router;
