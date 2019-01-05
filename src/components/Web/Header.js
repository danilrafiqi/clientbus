import React, { Component } from 'react';
import logo from 'assets/img/logo.jpg';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="container">
          <div className="row align-items-center justify-content-between d-flex">
            <div id="logo">
              <Link to="/">
                <img src={logo} alt={logo} title={logo} />
              </Link>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active">
                  <a href="index.html">Home</a>
                </li>

                <li>
                  <a href="about-us.html">About Us</a>
                </li>
                <li>
                  <a href="category.html">Category</a>
                </li>
                <li>
                  <a href="price.html">Price</a>
                </li>
                <li>
                  <a href="blog-home.html">Blog</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
                <li className="menu-has-children">
                  <a href="">Pages</a>
                  <ul>
                    <li>
                      <a href="elements.html">elements</a>
                    </li>
                    <li>
                      <a href="search.html">search</a>
                    </li>
                    <li>
                      <a href="single.html">single</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link className="ticker-btn" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
            {/* #nav-menu-container */}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
