const express = require('express');
const router = express.Router();
const { register, updateUser, login, resetPassword } = require('../Controllers/UserController');
const {authenticationToken} = require('../middlewares/authenticationMiddleware');

router.post("/register", register);
router.put("/updateUser", authenticationToken ,updateUser);
router.post("/login", login);
router.post("/reset-password", authenticationToken, resetPassword);

module.exports = router;