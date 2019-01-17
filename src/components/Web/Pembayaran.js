import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

import { Link } from 'react-router-dom';
const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  desk: {
    padding: '24px',
    textAlign: 'justify'
  }
});

class Pembayaran extends Component {
  state = {
    datas: []
  };
  getBank = () => {
    axios.get(`${process.env.REACT_APP_API}/bank`).then(res => {
      this.setState({ datas: res.data });
    });
  };

  componentWillMount() {
    this.getBank();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.desk}>
          Bisku.com melayani pembayaran tiket Anda melalui transfer bank ke
          rekening kami di BCA, BNI, BRI, Mandiri dan CIMB Niaga. Ketika Anda
          memilih transfer bank sebagai metode pembayaran di halaman pembayaran,
          pastikan Anda memasukkan data nama rekening bank yang mana Anda akan
          melakukan transfer bank ke rekening kami. Pastikan Anda melakukan
          pembayaran secara lunas dalam batas waktu maksimal 45 menit. Setelah
          pembayaran dilakukan silakan kunjungi halaman “Konfirmasi Pembayaran”
          di link <Link to="/konfirmasi">Konfirmasi</Link>. Silakan upload bukti
          transfer dan Masukkan data mengenai detail rekening pengirim transfer.
        </div>
        {this.state.datas.map(data => {
          return (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <span className={classes.heading}>{data.nama}</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: 'block' }}>
                <p>Nama Rekening : {data.atas_nama}</p>
                <p>No Rekening : {data.no_rek}</p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Pembayaran);
