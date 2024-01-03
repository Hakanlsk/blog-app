const express = require('express');
const { requireSingIn } = require('../controllers/userController');
const { createPostController, getAllPostsController, getUserPostController } = require('../controllers/postController');

//router object
const router = express.Router();

//CREATE POST | POST
router.post('/create-post', requireSingIn, createPostController)

//GET ALL POSTS
router.get('/get-all-post', getAllPostsController)

//GET USER POSTS
router.get('/get-user-post', requireSingIn, getUserPostController)

//export
module.exports = router;
