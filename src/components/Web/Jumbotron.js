import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Jumbotron extends Component {
  render() {
    return (
      <section className="callto-action-area section-gap" id="join">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="menu-content col-lg-9">
              <div className="title text-center">
                <h1 className="mb-10 text-white">
                  Join us today without any hesitation
                </h1>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                <Link className="primary-btn" to="/cari/jadwal">
                  Cari tiket
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Jumbotron;
