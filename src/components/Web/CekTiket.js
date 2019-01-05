import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Search extends Component {
  render() {
    return (
      <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg" />
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="banner-content col-lg-12">
              <h1 className="text-white">
                <span>Cek </span>Tiket
              </h1>
              <form className="serach-form-area">
                <div className="row justify-content-center form-wrap">
                  <div className="col-lg-8 form-cols">
                    <input
                      type="text"
                      className="form-control"
                      name="search"
                      placeholder="Masukkan Kode Booking"
                    />
                  </div>
                  <div className="col-lg-4 form-cols">
                    <Link
                      className="btn btn-info"
                      to={`/cektiket/e6b7c672-0498-4764-86c8-cd8f2dbcfec6`}>
                      <span className="lnr lnr-magnifier" /> Search
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
