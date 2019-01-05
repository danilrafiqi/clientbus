import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class DataPenumpang extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Data Penumpang
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="nama"
              name="nama"
              label="Nama"
              fullWidth
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="no_hp"
              name="no_hp"
              label="No HP"
              fullWidth
              onChange={this.props.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              onChange={this.props.handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default DataPenumpang;
