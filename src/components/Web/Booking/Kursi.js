import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import './kursi.css';

import { withRouter } from 'react-router-dom';
const styles = {
  seatWrapper: {
    border: '1px solid #999',
    margin: '0 auto',
    maxWidth: '200px',
    width: '100%',
    padding: '10px'
  },
  kursi: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '40px',
    height: '40px',
    // maxHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid white',
    cursor: 'pointer',
    color: 'white'
  },
  kursiWrap: {
    padding: 0
  }
};

class Kursi extends Component {
  state = {
    datas: [],
    kursi_nmber: ''
  };
  kursi = async () => {
    let cek;
    const data = [];
    const kursi = await axios.get(
      `${process.env.REACT_APP_API}/cari/kursi/${this.props.match.params.id}/${
        this.props.match.params.tanggal
      }`
    );

    const jumlah_kursi = await axios.get(
      `${process.env.REACT_APP_API}/bus/plat/${this.props.match.params.plat}`
    );
    const get_kursi_dipesan = () => {
      const temp = [];
      kursi.data.map(mykursi => {
        return temp.push(mykursi.no_kursi);
      });
      return temp;
    };
    let data_kursi = get_kursi_dipesan();

    for (let i = 1; i <= jumlah_kursi.data[0].jumlah_kursi; i++) {
      cek = `enable ${i}`;
      for (let j = 0; j < data_kursi.length; j++) {
        if (i === parseInt(data_kursi[j])) {
          cek = `disable ${data_kursi[j]}`;
        }
      }
      data.push(cek);
    }
    this.setState({
      datas: data
    });
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

  changeKursi = i => {
    this.setState({
      kursi_nmber: i
    });
  };
  componentDidMount() {
    this.kursi();
  }
  render() {
    const { kursi_nmber } = this.state;
    return (
      <Grid style={styles.seatWrapper} container spacing={24}>
        <Grid
          style={styles.kursiWrap}
          item
          xs={3}
          sm={3}
          xl={3}
          md={3}
          lg={3}
        />
        <Grid
          style={styles.kursiWrap}
          item
          xs={3}
          sm={3}
          xl={3}
          md={3}
          lg={3}
        />
        <Grid
          style={styles.kursiWrap}
          item
          xs={3}
          sm={3}
          xl={3}
          md={3}
          lg={3}
        />
        <Grid style={styles.kursiWrap} item xs={3} sm={3} xl={3} md={3} lg={3}>
          <div style={styles.kursi} className="disable">
            Supir
          </div>
        </Grid>
        {this.state.datas.map((data, i) => {
          return (
            <Grid
              style={styles.kursiWrap}
              key={i}
              item
              xs={3}
              sm={3}
              xl={3}
              md={3}
              lg={3}>
              <div
                onClick={() => {
                  this.props.handleKursi(i + 1);
                  this.changeKursi(i);
                }}
                className={kursi_nmber === i ? `${data} book` : `${data}`}
                value={i + 1}
                style={styles.kursi}>
                {i + 1}
              </div>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withRouter(Kursi);
