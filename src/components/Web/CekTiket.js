import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
  state = {
    id: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
                      name="id"
                      placeholder="Masukkan Kode Booking"
                      onChange={this.handleChange}
                      value={this.state.id}
                    />
                  </div>
                  <div className="col-lg-4 form-cols">
                    <Link
                      className="btn btn-info"
                      to={`/cektiket/?bookId=${this.state.id}`}>
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
