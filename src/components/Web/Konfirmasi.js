import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    width: '100%',
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  headerText: {
    fontSize: '30px',
    margin: '20px 0 30px',
    fontWeight: 'bold',
    color: '#007ce8 ',
    textAlign: 'center'
  },
  alert: {
    color: '#31708f',
    backgroundColor: '#d9edf7',
    borderColor: '#bce8f1',
    padding: '15px',
    marginBottom: '20px',
    border: '1px solid transparent',
    borderRadius: '4px'
  },
  image: {
    display: 'block',
    maxWidth: '400px',
    width: '100%',
    height: 'auto'
  },
  imgWrap: {
    width: '100%'
  }
});

class Konfirmasi extends Component {
  state = {
    id: '',
    nama: '',
    bank: '',
    jumlah_transfer: ''
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const dataForm = [
      {
        title: 'Kode Booking',
        name: 'id',
        nilai: this.state.id
      },
      {
        title: 'Nama Pemilik Rekening',
        name: 'nama',
        nilai: this.state.nama
      },
      {
        title: 'Bank',
        name: 'bank',
        nilai: this.state.bank
      },
      {
        title: 'Jumlah Transfer',
        name: 'jumlah_transfer',
        nilai: this.state.jumlah_transfer
      }
    ];
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <div className={classes.headerText}>Konfirmasi Pembayaran</div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className={classes.alert}>
              Silahkan lengkapi form dibawah untuk konfirmasi pembayaran anda.
              Penting! Mohon konfirmasi ini hanya dilakukan setelah Anda
              melakukan pembayaran. Isi data dengan benar untuk memudahkan kami
              verifikasi pembayaran Anda.
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <form autoComplete="off">
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
              <Input type="file" fullWidth />
              <br />
              <br />
              <Button variant="contained" color="primary">
                Upload Bukti Transfer
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.imgWrap}>
              <img
                className={classes.image}
                src="https://d374lxn0zq4jnw.cloudfront.net/images/Konfirmasi_Pembayaran.png"
                alt="as"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Konfirmasi);
