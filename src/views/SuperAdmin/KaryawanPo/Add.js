import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { AddBtn } from 'components/Crud/Btn';
import AddUpdate from 'components/Crud/AddUpdate';

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import jwtDecode from 'jwt-decode';

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
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      open: false,
      id: '',
      nama: '',
      jenis_kelamin: '',
      hak_akses: '',
      email: '',
      password: '',
      po_id_for_cek: this.setPoId(),
      po_id: '',
      data_po: [],
      data_hak_akses: this.getHakAkses()
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  getHakAkses = () => {
    const hak = this.getUserFromToken();
    if (hak.hak_akses === 'superadmin') {
      return ['superadmin', 'admin', 'manager', 'manager_po', 'petugas'];
    } else {
      return ['manager_po', 'petugas'];
    }
  };

  getToken = () => {
    return localStorage.getItem('drcreative');
  };
  getUserFromToken = () => {
    const token = this.getToken();
    try {
      if (token) {
        const user = jwtDecode(token);
        return user;
      }
    } catch (e) {
      return 'notvalid';
    }
  };

  setPoId = () => {
    const po_id = this.getUserFromToken();
    return po_id.po;
  };

  getDataPo = () => {
    let url;
    const po = this.getUserFromToken();
    if (po.po === 'null') {
      url = `${process.env.REACT_APP_API}/po/`;
    } else {
      url = `${process.env.REACT_APP_API}/po/${po.po}`;
    }

    axios.get(url).then(res => {
      this.setState({
        data_po: res.data
      });
    });
  };

  create = () => {
    const { po_id_for_cek } = this.state;
    let userUrl;
    const loginUrl = `${process.env.REACT_APP_API}/login`;
    if (po_id_for_cek == 'null') {
      userUrl = `${process.env.REACT_APP_API}/user`;
    } else {
      userUrl = `${process.env.REACT_APP_API}/karyawan-po`;
    }
    const dataLogin = {
      email: this.state.email,
      password: this.state.password,
      hak_akses: this.state.hak_akses
    };

    const dataUser = {
      nama: this.state.nama,
      jenis_kelamin: this.state.jenis_kelamin,
      email: this.state.email,
      po_id: this.state.po_id
    };

    axios.post(loginUrl, dataLogin).then(() => {
      axios.post(userUrl, dataUser).then(() => {
        console.log('running');
        this.setState({
          open: false,
          id: '',
          nama: '',
          jenis_kelamin: '',
          email: '',
          password: '',
          po_id: ''
        });
        this.props.getData();
      });
    });
  };

  componentWillMount() {
    this.getDataPo();
  }

  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Nama',
        name: 'nama',
        nilai: this.state.nama
      },
      {
        title: 'Email',
        name: 'email',
        nilai: this.state.email
      },
      {
        title: 'Password',
        name: 'password',
        nilai: this.state.password
      }
    ];

    return (
      <AddUpdate
        title="Tambah User"
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

          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <InputLabel htmlFor="po_id">PO</InputLabel>
            <Select
              value={this.state.po_id}
              onChange={this.handleChange}
              input={<FilledInput name="po_id" id="po_id" />}>
              {this.state.data_po.map(datas => {
                return (
                  <MenuItem key={datas.id} value={datas.id}>
                    {datas.nama}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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
        {console.log('dpop', this.state.data_po)}
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(Add);
