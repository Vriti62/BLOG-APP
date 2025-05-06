const express = require('express');
const { authenticationToken } = require('../middlewares/authenticationMiddleware');
const { followUser, requestAccept, getFollowRequests } = require('../Controllers/followController');
const router = express.Router();

router.post("/followUser/:id", authenticationToken, followUser);
router.post("/requestAccept/:_id", authenticationToken, requestAccept);
router.get('/followRequests', authenticationToken, getFollowRequests);

module.exports = router;