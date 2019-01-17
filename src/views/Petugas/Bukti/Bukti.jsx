import React, { Component } from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';

import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
};

class Tiket extends Component {
  state = {
    datas: []
  };

  async setNewTiket() {
    const datas = await axios.get(`${process.env.REACT_APP_API}/bukti`);

    const arrTable = [];
    await datas.data.map(data => {
      return arrTable.push([
        data.nama_pengirim,
        data.nama_bank_pengirim,
        data.jumlah_transfer,
        data.tiket_id,
        <a href={`${process.env.REACT_APP_API}/${data.foto}`}>
          <img
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            src={`${process.env.REACT_APP_API}/${data.foto}`}
            alt={data.foto}
            title={data.foto}
          />
        </a>
      ]);
    });

    this.setState({
      datas: arrTable
    });
  }
  async componentWillMount() {
    await this.setNewTiket();
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Bukti</h4>
              <p className={classes.cardCategoryWhite}>Cek Bukti Pembayaran</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Nama Pengirim',
                  'Nama Bank Pengirim',
                  'Jumlah Transfer',
                  'Kode Booking',
                  'Foto'
                ]}
                tableData={this.state.datas}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Tiket);
