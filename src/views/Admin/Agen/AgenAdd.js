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
import { AddBtn } from 'components/Crud/Btn';
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
class AgenAdd extends Component {
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
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  create = () => {
    axios
      .post(`${process.env.REACT_APP_API}/agen`, {
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
          email: '',
          data_po: []
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
        title: 'Nama Agen',
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
        title="Tambah Agen"
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
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
