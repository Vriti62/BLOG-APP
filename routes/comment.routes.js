const express = require('express');
const { addComment, replyComment } = require('../Controllers/commentsController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post("/addComment/:id", authenticationToken, addComment);
router.post("/addReply/:id", authenticationToken, replyComment);

module.exports = router;