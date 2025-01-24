import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css'; // Ensure this is imported if you're using an external CSS file

const EditBlogPage = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setTitle(res.data.title);
        setImageUrl(res.data.imageUrl);
        setContent(res.data.content);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${id}`, { title, imageUrl, content });
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error("Error updating the blog:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title py-3">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
