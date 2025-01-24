import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import '../App.css'; // Import the CSS file

const ShowBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container ">

       <center>
        <h1 className="title"><i>{blog.title}</i></h1>
      </center><br/><div className="row"><div className="col-6">
     
      {blog.imageUrl && (
        <div className="my-3">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="img-fluid w-100"
          />
        </div>
      )}</div>
      <div className="col-6">
      <div className="content-container p-3">
        <p>{blog.content}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/blogs/edit/${id}`} className="btn btn-primary btn-lg">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger btn-lg">
            Delete
          </button>
        </div>
      </div></div></div>
      <br/>
    </div>
  );
};

export default ShowBlogPage;
