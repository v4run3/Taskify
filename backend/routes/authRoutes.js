const express = require('express');
const { loginUser, registerUser, getUserProfile, updateUserProfile } = require('../controllers/authController');

const router = express.Router();

//auth routes
router.post("/register",registerUser); // register user
router.post("/login",loginUser); // login user
router.get("/profile",protect,getUserProfile); // get user profile
router.put("/profile",protect,updateUserProfile); // update user profile

module.exports = router;