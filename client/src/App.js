import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NewBlogPage from "./pages/NewBlogPage";
import ShowBlogPage from "./pages/ShowBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="new" element={<NewBlogPage />} />
          <Route path="home" element={<HomePage />} />

          <Route path="blogs/:id" element={<ShowBlogPage />} />
          <Route path="blogs/edit/:id" element={<EditBlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
