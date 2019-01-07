import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthenticatedAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.getCurrentUser(),
      hak_akses: this.getHakAkses(),
      po: this.getPo()
    };
  }

  getToken = () => {
    return localStorage.getItem('drcreative');
  };

  setToken = token => {
    localStorage.setItem('drcreative', token);
  };
  getCurrentUser = () => {
    const token = this.getToken();
    try {
      if (token) return jwtDecode(token);
    } catch (e) {
      return 'notvalid';
    }
  };

  getHakAkses = () => {
    const token = this.getToken();
    try {
      if (token) {
        const user = jwtDecode(token);
        return user.hak_akses;
      }
    } catch (e) {
      return 'notvalid';
    }
  };

  getPo = () => {
    const token = this.getToken();
    try {
      if (token) {
        const user = jwtDecode(token);
        return user.hak_akses;
      }
    } catch (e) {
      return 'notvalid';
    }
  };

  renderUser = () => {
    const jwt = this.getToken();
    if (
      !jwt ||
      this.state.hak_akses === 'undefined' ||
      this.state.hak_akses === 'notvalid' ||
      this.state.user === null
    ) {
      this.props.history.push('/auth/signin', { from: this.props.location });
    } else if (this.state.hak_akses != 'admin') {
      this.props.history.push('/cannotaccess');
    }
    if (this.state.user === 'notvalid') {
      this.props.history.push('/tokennotvalid');
    }

    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        localStorage.removeItem('drcreative');
        this.props.history.push('/auth/signin', { from: this.props.location });
      });
  };

  componentWillMount() {
    this.renderUser();
    console.log('hakajska', this.state.hak_akses);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedAdmin);
