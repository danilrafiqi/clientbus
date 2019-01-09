import React, { Component } from 'react';
import AddUpdate from 'components/Crud/AddUpdate';
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
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      open: false,
      id: '',
      plat: '',
      jumlah_kursi: '',
      kelas_id: '',
      data_kelas: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  create = () => {
    axios
      .post(`${process.env.REACT_APP_API}/bus`, {
        plat: this.state.plat,
        jumlah_kursi: this.state.jumlah_kursi,
        kelas_id: this.state.kelas_id
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          plat: '',
          jumlah_kursi: '',
          kelas_id: ''
        });
        this.props.getData();
      });
  };

  getKelas = () => {
    const user = tokenHelpers.decodeToken();

    axios
      .get(`${process.env.REACT_APP_API}/kelas/${user.po}/bypo`)
      .then(res => {
        this.setState({
          data_kelas: res.data
        });
      });
  };

  componentWillMount() {
    this.getKelas();
  }
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Plat',
        name: 'plat',
        nilai: this.state.plat
      },
      {
        title: 'Jumlah Kursi',
        name: 'jumlah_kursi',
        nilai: this.state.jumlah_kursi
      }
    ];

    return (
      <AddUpdate
        title="Tambah Bus"
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
            <InputLabel htmlFor="kelas_id">Kelas</InputLabel>
            <Select
              value={this.state.kelas_id}
              onChange={this.handleChange}
              input={<FilledInput name="kelas_id" id="kelas_id" />}>
              {this.state.data_kelas.map(datas => {
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
