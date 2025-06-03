const express = require('express');
const { refreshToken } = require('../Controllers/authController');
const router = express.Router();

router.post("/refreshToken", refreshToken);

module.exports = router;