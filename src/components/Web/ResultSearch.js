import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Expansion from './Expansion';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
const styles = {
  listWrapper: {
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    color: '#434343',
    backgroundColor: '#fff'
  },
  title: {
    width: '100%',
    marginBottom: '20px',
    float: 'left'
  },
  titleBold: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '5px'
  },
  titleDesc: {
    color: '#727272',
    fontSize: '12px',
    fontWeight: '300'
  }
};

class Summary extends Component {
  render() {
    const {
      id,
      kelas_nama,
      po_nama,
      tanggal_keberangkatan,
      pemberangkatan,
      pemberhentian,
      rute_deskripsi,
      harga,
      plat
    } = this.props.data;
    return (
      <div style={styles.listWrapper}>
        <div style={styles.title}>
          <div style={styles.titleBold}>{po_nama}</div>
          <div style={styles.titleDesc}>{kelas_nama}</div>
        </div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} xl={3} md={3} lg={3}>
            <div style={styles.titleBold}>{pemberangkatan}</div>
            <div style={styles.titleDesc}>
              {moment(tanggal_keberangkatan).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} xl={3} md={3} lg={3}>
            <div>{rute_deskripsi}</div>
          </Grid>
          <Grid item xs={12} sm={6} xl={3} md={3} lg={3}>
            <div style={styles.titleBold}>{pemberhentian}</div>
          </Grid>
          <Grid item xs={12} sm={6} xl={3} md={3} lg={3}>
            <div style={styles.titleBold}>{harga}</div>
            <Link
              to={`/booking/${id}/${moment(tanggal_keberangkatan).format(
                'YYYY-MM-DD'
              )}/${plat}`}>
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class Detail extends Component {
  render() {
    const {
      plat,
      kelas_deskripsi,
      jumlah_kursi,
      kursi_tersedia
    } = this.props.data;
    return (
      <table
        style={{
          color: '#434343'
        }}>
        <tbody>
          <tr>
            <td>Plat</td>
            <td>{plat}</td>
          </tr>
          <tr>
            <td>Fasilitas</td>
            <td>{kelas_deskripsi}</td>
          </tr>
          <tr>
            <td>Jumlah Kursi</td>
            <td>{jumlah_kursi}</td>
          </tr>
          <tr>
            <td>Kursi Tersedia</td>
            <td>{kursi_tersedia}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class ResultSearch extends Component {
  state = {
    data: []
  };

  getTiket = async arg => {
    try {
      const datas = await axios.get(
        `${process.env.REACT_APP_API}/cari/jadwal${arg}`
      );
      this.setState({
        data: datas.data
      });
    } catch (err) {
      throw err;
    }
  };
  componentDidMount() {
    this.getTiket(this.props.rprop.location.search);
  }

  componentWillReceiveProps(nextProps) {
    this.getTiket(nextProps.rprop.location.search);
  }
  render() {
    return this.state.data.map((datas, index) => {
      return (
        <Expansion
          key={datas.id}
          summary={<Summary data={datas} />}
          detail={<Detail data={datas} />}
        />
      );
    });
  }
}

export default ResultSearch;
