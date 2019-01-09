import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { UpdateBtn } from 'components/Crud/Btn';
import AddUpdate from 'components/Crud/AddUpdate';
import tokenHelpers from 'helpers/tokenHelpers';

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
class AgenUpdate extends Component {
  state = {
    labelWidth: 0,
    open: false,
    id: '',
    nama: '',
    alamat: '',
    no_hp: '',
    email: '',
    po_id: this.setPo(),
    data_po: []
  };

  setPo() {
    const user = tokenHelpers.decodeToken();
    return user.po;
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/agen/${id}`).then(res => {
      this.setState({
        open: true,
        nama: res.data[0].nama,
        alamat: res.data[0].alamat,
        no_hp: res.data[0].no_hp,
        email: res.data[0].email,
        po_id: res.data[0].po_id
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/agen/${id}`, {
        nama: this.state.nama,
        alamat: this.state.alamat,
        no_hp: this.state.no_hp,
        email: this.state.email,
        po_id: this.state.po_id
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          nama: '',
          alamat: '',
          no_hp: '',
          email: ''
        });
        this.props.getData();
      });
  };
  getPo = () => {
    axios.get(`${process.env.REACT_APP_API}/po/`).then(res => {
      this.setState({
        data_po: res.data
      });
    });
  };

  componentWillMount() {
    this.getPo();
  }
  render() {
    const { classes } = this.props;
    const dataForm = [
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
        title="Update PO"
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
        </form>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <InputLabel htmlFor="po_id">PO</InputLabel>
          <Select
            disabled
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
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenUpdate);
