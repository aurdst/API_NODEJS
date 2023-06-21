const express = require('express');
const router = express.Router();
const cors = require('cors');
const Blog = require('../models/blogModel');

// Activer CORS pour toutes les routes du routeur
router.use(cors());

// GET: /api/blogs
router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: /api/blogs/:id
router.get('/api/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      throw new Error('Blog does not exist');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// POST: /api/blogs
router.post('/api/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: /api/blogs/:id
router.put('/api/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (updateBlog) {
      res.status(200).json(updateBlog);
    } else {
      throw new Error('Blog does not exist');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE: /api/blogs/:id
router.delete('/api/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
