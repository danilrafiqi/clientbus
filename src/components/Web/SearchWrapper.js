import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg" />
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="banner-content col-lg-12">
              <h1 className="text-white">
                <span>Cari</span>Tiket
              </h1>
              <form className="serach-form-area">
                <div className="row justify-content-center form-wrap">
                  <div
                    className="col-lg-4 form-cols"
                    style={{
                      textAlign: 'left'
                    }}>
                    {this.props.pemberangkatan}
                  </div>
                  <div
                    className="col-lg-3 form-cols"
                    style={{
                      textAlign: 'left'
                    }}>
                    {this.props.pemberhentian}
                  </div>
                  <div
                    className="col-lg-3 form-cols"
                    style={{
                      textAlign: 'left'
                    }}>
                    {this.props.tanggal}
                  </div>
                  <div
                    className="col-lg-2 form-cols"
                    style={{
                      textAlign: 'left',
                      display: 'flex'
                    }}>
                    {this.props.tombol}
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
