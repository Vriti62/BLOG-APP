const express = require('express');
const { likeBlog } = require('../Controllers/likeController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post("/likeBlog/:_id",authenticationToken,likeBlog);

module.exports = router;