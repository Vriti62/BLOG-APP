const express = require('express');
const { addComment } = require('../Controllers/commentsController');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.post("/addComment/:id", authenticationToken, addComment);

module.exports = router;