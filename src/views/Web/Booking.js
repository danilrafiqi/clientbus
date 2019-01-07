import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DataPenumpang from 'components/Web/Booking/DataPenumpang';
import DataKursi from 'components/Web/Booking/Kursi';
import Review from 'components/Web/Booking/Review';
import axios from 'axios';
import uuid from 'uuid/v4';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ['Data Penumpang', 'Pilih Kursi', 'Review Pemesanan'];

class Booking extends React.Component {
  state = {
    activeStep: 0,
    nama: '',
    email: '',
    no_hp: '',
    harga: '',
    no_kursi: 'blm',
    penumpang_id: uuid(),
    book_id: uuid()
  };

  print = () => {
    const input = document.getElementById('print');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save('download.pdf');
    });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <DataPenumpang handleChange={this.handleChange} />;

      case 1:
        return <DataKursi handleKursi={this.handleKursi} />;
      case 2:
        return <Review data={this.state} />;
      default:
        throw new Error('Unknown step');
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('klik', this.state.nama, this.state.email, this.state.no_hp);
  };
  handleKursi = kursi => {
    this.setState({ no_kursi: kursi });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  sendPenumpang = () => {
    const data = {
      id: this.state.penumpang_id,
      nama: this.state.nama,
      no_hp: this.state.no_hp,
      email: this.state.email
    };
    axios.post(`${process.env.REACT_APP_API}/pesan/penumpang`, data);
  };

  bookTiket = () => {
    const data = {
      penumpang_id: this.state.penumpang_id,
      book_id: this.state.book_id,
      no_kursi: this.state.no_kursi,
      jadwal_id: this.props.match.params.id,
      total: this.state.harga
    };
    axios.post(`${process.env.REACT_APP_API}/pesan/tiket`, data);
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  async componentDidMount() {
    const data = await axios.get(
      `${process.env.REACT_APP_API}/cari/jadwal/${this.props.match.params.id}`
    );
    this.setState({ harga: data.data[0].harga });
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Bisku.com
            </Typography>
          </Toolbar>
        </AppBar>
        {console.log(
          'state',
          this.state.nama,
          this.state.email,
          this.state.no_hp,
          this.state.no_kursi,
          this.state.penumpang_id,
          this.state.harga,
          this.props,
          'bookid',
          this.state.book_id
        )}
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Pesan Tiket
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Terimakasih telah melakukan pemesanan tiket
                  </Typography>
                  <Typography variant="subtitle1">
                    Kode pemesanan kamu adalah {this.state.book_id}, Simpan kode
                    pemesanan untuk verifikasi tiket di petugas loket. Segera
                    lakukan pembayaran sebelum jam (...).
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === steps.length - 1
                          ? async () => {
                              await this.print();
                              await this.sendPenumpang();
                              await this.bookTiket();
                              this.handleNext();
                              console.log('berhasil');
                            }
                          : () => this.handleNext()
                      }
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Book' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Booking.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Booking);
