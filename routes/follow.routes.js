const express = require('express');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const { followUser, requestAccept } = require('../Controllers/followController');
const router = express.Router();

router.post("/followUser/:id", authenticationToken, followUser);
router.post("/requestAccept/:_id", authenticationToken, requestAccept);

module.exports = router;