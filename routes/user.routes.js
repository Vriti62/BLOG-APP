const express = require('express');
const router = express.Router();
const { register, updateUser, login } = require('../Controllers/UserController');
const {authenticationToken} = require('../middlewares/authenticationMiddleware');

router.post("/register", register);
router.put("/updateUser", authenticationToken ,updateUser);
router.post("/login", login);

module.exports = router;