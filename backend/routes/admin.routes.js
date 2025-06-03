const express = require('express');
const router = express.Router();
const { createAdmin } = require('../Controllers/adminController');
const {authenticationToken} = require('../middlewares/authenticationMiddleware');

router.post("/createAdmin", authenticationToken, createAdmin);

module.exports = router;