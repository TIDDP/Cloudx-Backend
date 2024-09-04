const express = require('express');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

// Create a Post
router.post('/createpost', createPost);

// Get All Posts
router.get('/getposts', getPosts);

// Get Single Post
router.get('/posts/:id', getPost);

// Update a Post
router.put('/updateposts/:id', updatePost);

// Delete a Post
router.delete('/deletepost/:id', deletePost);

module.exports = router;
