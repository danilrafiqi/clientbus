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
    nama: '',
    jenis_kelamin: ''
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/karyawan-po/${id}`).then(res => {
      this.setState({
        open: true,
        nama: res.data[0].nama,
        jenis_kelamin: res.data[0].jenis_kelamin
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/karyawan-po/${id}`, {
        nama: this.state.nama,
        jenis_kelamin: this.state.jenis_kelamin
      })
      .then(res => {
        this.setState({
          open: false,
          nama: '',
          jenis_kelamin: ''
        });
        this.props.getData();
      });
  };
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Nama',
        name: 'nama',
        nilai: this.state.nama
      }
    ];

    return (
      <AddUpdate
        title="Update Karyawan"
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
              />
            );
          })}

          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <InputLabel htmlFor="jenis_kelamin">Jenis Kelamin</InputLabel>
            <Select
              value={this.state.jenis_kelamin}
              onChange={this.handleChange}
              input={<FilledInput name="jenis_kelamin" id="jenis_kelamin" />}>
              <MenuItem value="l">Laki Laki</MenuItem>
              <MenuItem value="p">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
