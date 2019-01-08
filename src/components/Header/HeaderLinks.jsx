import React from 'react';
// @material-ui/core components

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class HeaderLinks extends React.Component {
  logout = () => {
    this.props.history.push('/');
    localStorage.removeItem('drcreative');
  };

  render() {
    return (
      <Button onClick={this.logout} color="primary">
        Logout
      </Button>
    );
  }
}

export default withRouter(HeaderLinks);
