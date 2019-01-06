import React, { Component } from 'react';
import { getJwt } from '../../helpers/getJwt';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  getUser = () => {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/auth/signin');
    }

    console.log('satu', this.state.user);
    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        console.log('add', res.data);
        this.setState({
          user: res.data
        });
        console.log('dua', this.state.user);
      })
      .catch(err => {
        localStorage.removeItem('drcreative');
        this.props.history.push('/auth/signin');
      });
    console.log('tiga', this.state.user);
  };

  componentWillMount() {
    this.getUser();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);
