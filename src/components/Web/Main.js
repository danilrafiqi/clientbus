import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <section className="post-area ">
        <div className="container">
          <div className="row justify-content-center d-flex">
            <div className="col-lg-8 post-list">{this.props.left}</div>
            <div className="col-lg-4 sidebar">
              <div className="single-slidebar">
                <h4>Jobs by Location</h4>
                <ul className="cat-list">
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>New York</p>
                      <span>37</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Park Montana</p>
                      <span>57</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Atlanta</p>
                      <span>33</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Arizona</p>
                      <span>36</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Florida</p>
                      <span>47</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Rocky Beach</p>
                      <span>27</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="justify-content-between d-flex"
                      href="category.html">
                      <p>Chicago</p>
                      <span>17</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="single-slidebar">
                <h4>Carrer Advice Blog</h4>
                <div className="blog-list">
                  <div
                    className="single-blog "
                    style={{ background: '#000 url(img/blog1.jpg)' }}>
                    <a href="single.html">
                      <h4>
                        Home Audio Recording <br />
                        For Everyone
                      </h4>
                    </a>
                    <div className="meta justify-content-between d-flex">
                      <p>02 Hours ago</p>
                      <p>
                        <span className="lnr lnr-heart" />
                        06
                        <span className="lnr lnr-bubble" />
                        02
                      </p>
                    </div>
                  </div>
                  <div
                    className="single-blog "
                    style={{ background: '#000 url(img/blog2.jpg)' }}>
                    <a href="single.html">
                      <h4>
                        Home Audio Recording <br />
                        For Everyone
                      </h4>
                    </a>
                    <div className="meta justify-content-between d-flex">
                      <p>02 Hours ago</p>
                      <p>
                        <span className="lnr lnr-heart" />
                        06
                        <span className="lnr lnr-bubble" />
                        02
                      </p>
                    </div>
                  </div>
                  <div
                    className="single-blog "
                    style={{ background: '#000 url(img/blog1.jpg)' }}>
                    <a href="single.html">
                      <h4>
                        Home Audio Recording <br />
                        For Everyone
                      </h4>
                    </a>
                    <div className="meta justify-content-between d-flex">
                      <p>02 Hours ago</p>
                      <p>
                        <span className="lnr lnr-heart" />
                        06
                        <span className="lnr lnr-bubble" />
                        02
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Main;
