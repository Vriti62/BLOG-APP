const express = require('express');
const router = express.Router();
const { register, updateUser, login, resetPassword, verifyToken } = require('../Controllers/UserController');
const {authenticationToken} = require('../middlewares/authenticationMiddleware');

router.post("/register", register);
router.put("/updateUser", authenticationToken ,updateUser);
router.post("/login", login);
router.post("/reset-password", authenticationToken, resetPassword);
router.post("/verify-token", authenticationToken, verifyToken)

module.exports = router;