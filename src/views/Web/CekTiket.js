import React, { Component } from 'react';
import Header from 'components/Web/Header';
import Footer from 'components/Web/Footer';
import CekTiketComponent from 'components/Web/CekTiket';
import Result from 'components/Web/ResultCekTiket';

import 'assets/css/animate.min.css';
import 'assets/css/bootstrap.css';
import 'assets/css/font-awesome.min.css';
import 'assets/css/linearicons.css';
import 'assets/css/main.css';
import 'assets/css/nice-select.css';

class CekTiket extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <CekTiketComponent />
        <section className="post-area ">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <div className="col-lg-12">
                <Result rprops={this.props} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CekTiket;
