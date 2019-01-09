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
    pemberangkatan: '',
    pemberhentian: '',
    rute_id: '',
    data_rute: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  create = () => {
    axios
      .post(`${process.env.REACT_APP_API}/tujuan`, {
        pemberangkatan: this.state.pemberangkatan,
        pemberhentian: this.state.pemberhentian,
        rute_id: this.state.rute_id
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          pemberangkatan: '',
          pemberhentian: '',
          rute_id: ''
        });
        this.props.getData();
      });
  };

  getRute = () => {
    const user = tokenHelpers.decodeToken();
    axios.get(`${process.env.REACT_APP_API}/rute/${user.po}/bypo`).then(res => {
      this.setState({
        data_rute: res.data
      });
    });
  };

  componentWillMount() {
    this.getRute();
  }
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'pemberangkatan',
        name: 'pemberangkatan',
        nilai: this.state.pemberangkatan
      },
      {
        title: 'Pemberhentian',
        name: 'pemberhentian',
        nilai: this.state.pemberhentian
      }
    ];

    return (
      <AddUpdate
        title="Tambah Tujuan"
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
            <InputLabel htmlFor="rute_id">Tujuan</InputLabel>
            <Select
              value={this.state.rute_id}
              onChange={this.handleChange}
              input={<FilledInput name="rute_id" id="rute_id" />}>
              {this.state.data_rute.map(datas => {
                return (
                  <MenuItem key={datas.id} value={datas.id}>
                    {datas.deskripsi}
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
