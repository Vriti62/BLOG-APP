const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const adminController = require('../Controllers/adminController');
// const {getUsers} = require('../Controllers/adminController');
const {paginationResults} = require('../middlewares/paginatedResults');
const {authenticationToken} = require('../middlewares/authenticationMiddleware');
router.post("/createAdmin", authenticationToken, adminController.createAdmin);
router.get("/users", paginationResults(User), adminController.getUsers);

module.exports = router;