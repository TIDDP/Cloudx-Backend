const Post = require('../models/Post');

// Create a New Post
exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // userId from JWT token

        const post = new Post({
            userId,
            content
        });

        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a Single Post
exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('userId', 'name');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a Post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { content }, { new: true });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
