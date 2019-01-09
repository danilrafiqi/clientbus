import React, { Component } from 'react';
import AddUpdate from '../../../components/Crud/AddUpdate';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import API from '../../components/Api';
import { UpdateBtn } from '../../../components/Crud/Btn';

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
    no_rek: '',
    atas_nama: ''
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/bank/${id}`).then(res => {
      this.setState({
        open: true,
        nama: res.data[0].nama,
        no_rek: res.data[0].no_rek,
        atas_nama: res.data[0].atas_nama
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/bank/${id}`, {
        nama: this.state.nama,
        no_rek: this.state.no_rek,
        atas_nama: this.state.atas_nama
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          nama: '',
          no_rek: '',
          atas_nama: ''
        });
        this.props.getData();
      });
  };
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Nama Bank',
        name: 'nama',
        nilai: this.state.nama
      },
      {
        title: 'No Rekening',
        name: 'no_rek',
        nilai: this.state.no_rek
      },
      {
        title: 'Nama Pemilik',
        name: 'atas_nama',
        nilai: this.state.atas_nama
      }
    ];

    return (
      <AddUpdate
        title="Update Bank"
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
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
