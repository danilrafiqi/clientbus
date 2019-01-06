import React, { Component } from 'react';
import Header from 'components/Web/Header';
import Footer from 'components/Web/Footer';
import Feature from 'components/Web/Feature';
import Konfirmasi from 'components/Web/Konfirmasi';
import Jumbotron from 'components/Web/Jumbotron';
import Auth from 'components/Auth/Authenticated';

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
        <Jumbotron />
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
const withAuth = props => {
  return (
    <Auth>
      <Home />
    </Auth>
  );
};

export default withAuth;
