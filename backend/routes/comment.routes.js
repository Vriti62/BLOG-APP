const express = require('express');
const { addComment, replyComment, getComments } = require('../Controllers/commentsController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const { paginationResults } = require('../middlewares/paginatedResults');
const comments = require('../Models/commentModel');
const router = express.Router();

router.post("/addComment/:id", authenticationToken, addComment);
router.post("/addReply/:id", authenticationToken, replyComment);
router.get("/getComments", authenticationToken, paginationResults(comments), getComments);

module.exports = router;