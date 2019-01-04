import React, { Component } from 'react';
import icon1 from 'assets/img/icon/icon1.png';
import icon2 from 'assets/img/icon/icon2.png';
import icon3 from 'assets/img/icon/icon3.png';
import icon4 from 'assets/img/icon/icon4.png';
import icon5 from 'assets/img/icon/icon5.png';
import icon6 from 'assets/img/icon/icon6.png';

class Feature extends Component {
  render() {
    return (
      <section className="feature-cat-area " id="category">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="menu-content pb-60 col-lg-10">
              <div className="title text-center">
                <h1 className="mb-10">Mengapa Beli di Bisku.com</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon1} alt={icon1} />
                </a>
                <p>Kerjasama Resmi</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon2} alt={icon2} />
                </a>
                <p>Pilihan Tujuan Terbanyak</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon3} alt={icon3} />
                </a>
                <p>Transaksi Aman Dan Terpercaya</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon4} alt={icon4} />
                </a>
                <p>Harga Resmi dan Terbaik</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon5} alt={icon5} />
                </a>
                <p>Valid E-ticket</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="single-fcat">
                <a href="category.html">
                  <img src={icon6} alt={icon6} />
                </a>
                <p>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Feature;
