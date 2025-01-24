const { log } = require("node:console");
const Blog = require("../models/blogModel");


// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single blog by ID
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  const { title, imageUrl, content } = req.body;
  console.log(title, imageUrl, content);
  try {
    const newBlog = new Blog({ title, imageUrl, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update a blog by ID
exports.updateBlog = async (req, res) => {
  const { title, imageUrl, content } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, content },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
