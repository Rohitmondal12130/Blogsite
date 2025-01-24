import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Homepage.css'; // Importing the custom CSS file for additional styling

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="home-page">
      <br></br>
      <h1 className="title text-center">Recent Blogs</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card custom-card shadow-lg">
              <img
                src={blog.imageUrl}
                className="card-img-top"
                alt={blog.title}
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
