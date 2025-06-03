const express = require('express');
const { getQuestions } = require('../Controllers/chatbotController');
const router = express.Router();

router.post("/questions", getQuestions);

module.exports = router;