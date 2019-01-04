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
    harga: '',
    kursi_tersedia: '',
    bus_id: '',
    data_bus: [],
    tujuan_id: '',
    data_tujuan: []
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/jadwal/${id}`).then(res => {
      this.setState({
        open: true,
        harga: res.data[0].harga,
        kursi_tersedia: res.data[0].kursi_tersedia,
        bus_id: res.data[0].bus_id,
        tujuan_id: res.data[0].tujuan_id
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/jadwal/${id}`, {
        harga: this.state.harga,
        kursi_tersedia: this.state.kursi_tersedia,
        bus_id: this.state.bus_id,
        tujuan_id: this.state.tujuan_id
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          harga: '',
          kursi_tersedia: '',
          bus_id: '',
          tujuan_id: ''
        });
        this.props.getData();
      });
  };

  getBus = () => {
    axios.get(`${process.env.REACT_APP_API}/bus/`).then(res => {
      this.setState({
        data_bus: res.data
      });
    });
  };
  getTujuan = () => {
    axios.get(`${process.env.REACT_APP_API}/tujuan/`).then(res => {
      this.setState({
        data_tujuan: res.data
      });
    });
  };

  componentWillMount() {
    this.getBus();
    this.getTujuan();
  }
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Harga',
        name: 'harga',
        nilai: this.state.harga
      },
      {
        title: 'Kursi Tersedia',
        name: 'kursi_tersedia',
        nilai: this.state.kursi_tersedia
      },
      {
        title: 'Tanggal Keberangkatan',
        name: 'tanggal_keberangkatan',
        nilai: this.state.tanggal_keberangkatan
      }
    ];

    return (
      <AddUpdate
        title="Update Jadwal"
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
            <InputLabel htmlFor="bus_id">Bus</InputLabel>
            <Select
              value={this.state.bus_id}
              onChange={this.handleChange}
              input={<FilledInput name="bus_id" id="bus_id" />}>
              {this.state.data_bus.map(datas => {
                return (
                  <MenuItem key={datas.id} value={datas.id}>
                    {datas.plat}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <InputLabel htmlFor="tujuan_id">Tujuan</InputLabel>
            <Select
              value={this.state.tujuan_id}
              onChange={this.handleChange}
              input={<FilledInput name="tujuan_id" id="tujuan_id" />}>
              {this.state.data_tujuan.map(datas => {
                return (
                  <MenuItem key={datas.id} value={datas.id}>
                    {datas.pemberangkatan}-{datas.pemberhentian}
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
