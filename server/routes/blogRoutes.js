const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");




router.get("/", getBlogs);
router.post("/", createBlog);

router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
