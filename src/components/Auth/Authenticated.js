import React, { Component } from 'react';
import { getJwt } from '../../helpers/getJwt';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  getUser = () => {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/auth/signin');
    }

    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        console.log('ress', res);
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        localStorage.removeItem('drcreative');
        this.props.history.push('/signin');
      });
  };

  componentWillMount() {
    this.getUser();
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <LoadingScreen
          loading={true}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc="/logo.png"
          text="Here an introduction sentence (Optional)"
        />
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);
