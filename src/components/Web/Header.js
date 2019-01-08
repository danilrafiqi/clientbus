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
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/konfirmasi">Konfirmasi</Link>
                </li>
                <li>
                  <Link to="/metodepembayaran">Metode Pembayaran</Link>
                </li>

                <li>
                  <Link to="cari/jadwal">Cari Tiket</Link>
                </li>

                <li>
                  <Link to="cektiket">Cek Tiket</Link>
                </li>

                <li className="menu-has-children">
                  <a href="">Other</a>
                  <ul>
                    <li>
                      <Link to="cari/jadwal">Cari Tiket</Link>
                    </li>
                    <li>
                      <Link to="cektiket">Cek Tiket</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link className="ticker-btn" to="/auth/signin">
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
