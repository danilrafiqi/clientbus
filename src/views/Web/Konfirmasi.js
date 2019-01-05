import React, { Component } from 'react';
import Header from 'components/Web/Header';
import Footer from 'components/Web/Footer';
import Feature from 'components/Web/Feature';
import Konfirmasi from 'components/Web/Konfirmasi';
import Search from 'components/Web/Search';

import 'assets/css/animate.min.css';
import 'assets/css/bootstrap.css';
import 'assets/css/font-awesome.min.css';
import 'assets/css/linearicons.css';
import 'assets/css/main.css';
import 'assets/css/nice-select.css';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Search />
        <section className="post-area ">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-12">
                <Konfirmasi />
              </div>
            </div>
          </div>
        </section>
        <Feature />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
