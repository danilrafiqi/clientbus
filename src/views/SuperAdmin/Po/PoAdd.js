import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { AddBtn } from 'components/Crud/Btn';
import AddUpdate from 'components/Crud/AddUpdate';
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
    kode: '',
    nama: '',
    alamat: '',
    no_hp: '',
    email: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  create = () => {
    axios
      .post(`${process.env.REACT_APP_API}/po`, {
        kode: this.state.kode,
        nama: this.state.nama,
        alamat: this.state.alamat,
        no_hp: this.state.no_hp,
        email: this.state.email
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          kode: '',
          nama: '',
          alamat: '',
          no_hp: '',
          email: ''
        });
        this.props.getData();
      });
  };
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Kode',
        name: 'kode',
        nilai: this.state.kode
      },
      {
        title: 'Nama PO',
        name: 'nama',
        nilai: this.state.nama
      },
      {
        title: 'Alamat',
        name: 'alamat',
        nilai: this.state.alamat
      },
      {
        title: 'No HP',
        name: 'no_hp',
        nilai: this.state.no_hp
      },
      {
        title: 'Email',
        name: 'email',
        nilai: this.state.email
      }
    ];

    return (
      <AddUpdate
        title="Tambah PO"
        btnPopUp={<AddBtn handleClickOpen={this.handleClickOpen} />}
        btnSave={
          <Button color="primary" autoFocus onClick={this.create}>
            Simpan
          </Button>
        }
        open={this.state.open}>
        <form className={classes.root} autoComplete="off">
          {dataForm.map((datas, index) => {
            return (
              <TextField
                key={index}
                id="filled-name"
                label={datas.title}
                className={classes.textField}
                name={datas.name}
                value={datas.value}
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                variant="filled"
              />
            );
          })}
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
