import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },

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
    datas: []
  };

  async componentWillMount() {
    const datas = await axios.get(
      `http://localhost:2018/cari/jadwal/${this.props.match.params.id}`
    );
    this.setState({
      datas: datas.data[0]
    });
  }

  // print = () => {
  //   const string = renderToString(<Review />);
  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   pdf.fromHTML(string);
  //   pdf.save('pdf');
  // };

  render() {
    const { classes } = this.props;
    const { nama, email, no_hp, no_kursi, book_id } = this.props.data;
    const {
      harga,
      kelas_deskripsi,
      kelas_nama,
      pemberangkatan,
      pemberhentian,
      plat,
      po_nama,
      rute_deskripsi,
      tanggal_keberangkatan
    } = this.state.datas;

    return (
      <React.Fragment>
        <Grid container spacing={16} id="print">
          <Grid item xs={12} sm={6}>
            <p className={classes.title}>Kode Booking</p>
            <p className={classes.subtitle}>{book_id}</p>
          </Grid>
          {console.log('da', this.state.datas)}
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
                {moment(tanggal_keberangkatan).format('YYYY-MM-DD HH:mm:ss')}
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

          <Grid item container xs={12} sm={12} className={classes.marginTop}>
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
        </Grid>
        <br />
        <br />
        {console.log('proppppp', this.props)}
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <span className={classes.total}>{harga}</span>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Review));
