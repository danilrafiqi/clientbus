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
import moment from 'moment';
import DateFnsUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';

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
    data_tujuan: [],
    tanggal_keberangkatan: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    po_id: this.setPo()
  };

  setPo() {
    const user = tokenHelpers.decodeToken();
    return user.po;
  }

  handleDateChange = date => {
    this.setState({
      tanggal_keberangkatan: moment(date).format('YYYY-MM-DD HH:mm:ss')
    });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  create = () => {
    axios
      .post(`${process.env.REACT_APP_API}/jadwal`, {
        harga: this.state.harga,
        kursi_tersedia: this.state.kursi_tersedia,
        bus_id: this.state.bus_id,
        tujuan_id: this.state.tujuan_id,
        tanggal_keberangkatan: this.state.tanggal_keberangkatan
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          harga: '',
          kursi_tersedia: '',
          bus_id: '',
          tujuan_id: '',
          tanggal_keberangkatan: moment(new Date()).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        });
        this.props.getData();
      });
  };

  getBus = () => {
    axios
      .get(`${process.env.REACT_APP_API}/bus/${this.state.po_id}/bypo`)
      .then(res => {
        this.setState({
          data_bus: res.data
        });
      });
  };
  getTujuan = () => {
    axios
      .get(`${process.env.REACT_APP_API}/tujuan/${this.state.po_id}/bypo`)
      .then(res => {
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
    const { tanggal_keberangkatan } = this.state;
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
      }
    ];

    return (
      <AddUpdate
        title="Tambah Jadwal"
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

          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                fullWidth
                id="date"
                value={tanggal_keberangkatan}
                minDate={new Date()}
                maxDate={new Date().setMonth(new Date().getMonth() + 2)}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
