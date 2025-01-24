import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Custom CSS file for styling

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
    <div className="container-fluid">

      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/new">
              New Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
 