import React, { Component } from 'react';
import Search from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx';
import withStyles from '@material-ui/core/styles/withStyles';

class SearchChangePassword extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Input type="text" placeholder="Masukkan Email" />
        <Button aria-label="Search">
          Search <Search />
        </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(SearchChangePassword);
