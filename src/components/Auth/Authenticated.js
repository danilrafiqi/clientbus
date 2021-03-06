import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.getCurrentUser()
    };
  }

  getToken = () => {
    return localStorage.getItem('drcreative');
  };

  setToken = token => {
    localStorage.setItem('drcreative', token);
    // return token;
  };
  getCurrentUser = () => {
    const token = this.getToken();
    try {
      if (token) return jwtDecode(token);
    } catch (e) {
      return 'notvalid';
    }
  };

  renderUser = () => {
    const jwt = this.getToken();
    if (!jwt || this.state.user === null) {
      this.props.history.push('/auth/signin', { from: this.props.location });
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
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(AuthenticatedComponent);
