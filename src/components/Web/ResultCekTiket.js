import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  print: { width: '768px', margin: '0 auto' },
  marginTop: {
    marginTop: '10px'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '0.35em'
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontWeight: '400',
    marginBottom: '0'
  }
});

class Review extends React.Component {
  state = {
    nama: '',
    email: '',
    no_hp: '',
    no_kursi: '',
    book_id: '',
    harga: '',
    kelas_deskripsi: '',
    kelas_nama: '',
    pemberangkatan: '',
    pemberhentian: '',
    plat: '',
    po_nama: '',
    rute_deskripsi: '',
    tanggal_keberangkatan: '',
    isClick: false
  };
  print = () => {
    const input = document.getElementById('print');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save(`tiket${''}.pdf`);
    });
  };
  getTiket = async args => {
    const datas = await axios.get(`http://localhost:2018/cari/tiket/${args}`);
    if (datas.data.length !== 0) {
      this.setState({
        nama: datas.data[0].nama,
        email: datas.data[0].email,
        no_hp: datas.data[0].no_hp,
        no_kursi: datas.data[0].no_kursi,
        book_id: datas.data[0].book_id,
        harga: datas.data[0].harga,
        kelas_deskripsi: datas.data[0].kelas_deskripsi,
        kelas_nama: datas.data[0].kelas_nama,
        pemberangkatan: datas.data[0].pemberangkatan,
        pemberhentian: datas.data[0].pemberhentian,
        plat: datas.data[0].plat,
        po_nama: datas.data[0].po_nama,
        rute_deskripsi: datas.data[0].rute_deskripsi,
        tanggal_keberangkatan: datas.data[0].tanggal_keberangkatan
      });
    }

    this.setState({
      isClick: true
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log('nprops', nextProps);
    this.getTiket(nextProps.location.search);
  }

  render() {
    const { classes } = this.props;
    const {
      nama,
      email,
      no_hp,
      no_kursi,
      book_id,
      harga,
      kelas_deskripsi,
      kelas_nama,
      pemberangkatan,
      pemberhentian,
      plat,
      po_nama,
      rute_deskripsi,
      tanggal_keberangkatan
    } = this.state;

    return (
      <React.Fragment>
        {this.state.isClick ? (
          this.state.nama.length === 0 ? (
            <h1 style={{ textAlign: 'center' }}>Tiket belum diverifikasi</h1>
          ) : (
            <Grid container spacing={16} id="print" className={classes.print}>
              <Grid item xs={12} sm={6}>
                <p className={classes.title}>Kode Booking</p>
                <p className={classes.subtitle}>{book_id}</p>
              </Grid>
              <Grid item container xs={12} className={classes.marginTop}>
                <Grid item xs={12} sm={6}>
                  <p className={classes.title}>{po_nama}</p>
                  <p className={classes.subtitle}>{kelas_nama}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <p className={classes.title}>{plat}</p>
                  <p className={classes.subtitle}>No Kursi : {no_kursi}</p>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} className={classes.marginTop}>
                <p className={classes.title}>Fasilitas</p>
                <p className={classes.subtitle}>{kelas_deskripsi}</p>
              </Grid>

              <Grid item container className={classes.marginTop}>
                <Grid item xs={12} sm={6}>
                  <p className={classes.title}>Pemberangkatan</p>
                  <p className={classes.subtitle}>{pemberangkatan}</p>
                  <p className={classes.subtitle}>
                    {moment(tanggal_keberangkatan).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <p className={classes.title}>Pemberhentian</p>
                  <p className={classes.subtitle}>{pemberhentian}</p>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} className={classes.marginTop}>
                <p className={classes.title}>Via</p>
                <p className={classes.subtitle}>{rute_deskripsi}</p>
              </Grid>

              <Grid
                item
                container
                xs={12}
                sm={12}
                className={classes.marginTop}>
                <Grid item xs={12} sm={12}>
                  <p className={classes.title}>Detail Penumpang</p>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <p className={classes.subtitle}>{nama}</p>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <p className={classes.subtitle}>{email}</p>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <p className={classes.subtitle}>{no_hp}</p>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <List disablePadding>
                  <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <span className={classes.total}>{harga}</span>
                  </ListItem>
                </List>
                <Button onClick={this.print}>Print Tiket</Button>
              </Grid>
            </Grid>
          )
        ) : null}
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Review));
