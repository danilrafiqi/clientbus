import React, { Component } from 'react';
import AddUpdate from '../../../components/Crud/AddUpdate';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import API from '../../components/Api';
import { UpdateBtn } from '../../../components/Crud/Btn';

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
class AgenAdd extends Component {
  state = {
    labelWidth: 0,
    open: false,
    id: '',
    email: '',
    hak_akses: '',
    data_hak_akses: ['manager_po', 'petugas']
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/login/${id}`).then(res => {
      this.setState({
        open: true,
        email: res.data[0].email,
        hak_akses: res.data[0].hak_akses
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/login/${id}`, {
        hak_akses: this.state.hak_akses
      })
      .then(res => {
        this.setState({
          open: false,
          email: '',
          hak_akses: ''
        });
        this.props.getData();
      });
  };
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Email',
        name: 'email',
        nilai: this.state.email
      }
    ];

    return (
      <AddUpdate
        title="Update User"
        open={this.state.open}
        btnPopUp={
          <UpdateBtn handleClickOpen={() => this.detail(this.props.idNya)} />
        }
        btnSave={
          <Button
            onClick={() => this.update(this.props.idNya)}
            color="primary"
            autoFocus>
            Simpan
          </Button>
        }>
        <form className={classes.root} autoComplete="off">
          {dataForm.map((datas, index) => {
            return (
              <TextField
                key={index}
                id="filled-name"
                label={datas.title}
                className={classes.textField}
                name={datas.name}
                value={datas.nilai}
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                variant="filled"
                disabled={true}
              />
            );
          })}

          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <InputLabel htmlFor="hak_akses">Hak Akses</InputLabel>
            <Select
              value={this.state.hak_akses}
              onChange={this.handleChange}
              input={<FilledInput name="hak_akses" id="hak_akses" />}>
              {this.state.data_hak_akses.map(datas => {
                return (
                  <MenuItem key={datas} value={datas}>
                    {datas}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
