const express = require('express');
const { likeBlog, getLikes } = require('../Controllers/likeController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post("/likeBlog/:_id",authenticationToken,likeBlog);
router.get("/getLikes/:blogID", authenticationToken, getLikes);

module.exports = router;