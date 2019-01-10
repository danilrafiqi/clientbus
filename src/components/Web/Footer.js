import React, { Component } from 'react';
import bca from 'assets/img/bank/bca.png';
import bri from 'assets/img/bank/bri.png';
import bni from 'assets/img/bank/bni.png';
import mandiri from 'assets/img/bank/mandiri.jpeg';
import bersama from 'assets/img/bank/bersama.png';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="footer-area section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-3  col-md-12">
              <div className="single-footer-widget">
                <h6>Bisku.com</h6>
                <ul className="footer-nav">
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3  col-md-12">
              <div className="single-footer-widget newsletter">
                <h6>Social Media</h6>
                <ul className="footer-nav">
                  <li>
                    <a href="https://facebook.com">Facebook</a>
                  </li>
                  <li>
                    <a href="https://instagram.com">Instragram</a>
                  </li>
                  <li>
                    <a href="https://twitter.com">Twitter</a>
                  </li>
                  <li>
                    <a href="https://google.com">Google +</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3  col-md-12">
              <div className="single-footer-widget">
                <h6>About</h6>
                <p>
                  Bisku adalah situs booking tiket bus, travel, dan shuttle
                  online terbesar di Indonesia. Kami membantu Anda pesan tiket
                  dengan lebih cepat, mudah, dan aman
                </p>
              </div>
            </div>
            <div className="col-lg-3  col-md-12">
              <div className="single-footer-widget ">
                <h6 className="mb-20">Payments</h6>
                <ul className="instafeed d-flex flex-wrap">
                  <li>
                    <img src={bca} alt={bca} />
                  </li>
                  <li>
                    <img src={bri} alt={bri} />
                  </li>
                  <li>
                    <img src={bersama} alt={bersama} />
                  </li>
                  <li>
                    <img src={bni} alt={bni} />
                  </li>
                  <li>
                    <img src={mandiri} alt={mandiri} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row footer-bottom d-flex justify-content-between">
            <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | This template is made with{' '}
              <i className="fa fa-heart-o" aria-hidden="true" /> by{' '}
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer">
                Colorlib
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
