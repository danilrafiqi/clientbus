import React, { Component } from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';

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

  setVerified(id) {
    axios
      .put(`${process.env.REACT_APP_API}/tiket/${id}`, {
        status: 'lunas'
      })
      .then(() => {
        this.setNewTiket();
      });
  }

  setBooked(id) {
    axios
      .put(`${process.env.REACT_APP_API}/tiket/${id}`, {
        status: 'dipesan'
      })
      .then(() => {
        this.setNewTiket();
      });
  }

  setNull(id) {
    axios
      .put(`${process.env.REACT_APP_API}/tiket/${id}`, {
        status: 'kosong'
      })
      .then(() => {
        this.setNewTiket();
      });
  }

  async setNewTiket() {
    const datas = await axios.get(`${process.env.REACT_APP_API}/tiket`);

    const arrTable = [];
    await datas.data.map(data => {
      return arrTable.push([
        data.id,
        data.no_kursi,
        data.total,
        data.status,
        [
          <div key={data.id} style={{ whiteSpace: 'nowrap' }}>
            <Close
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => this.setBooked(data.id)}
            />
            <Check
              style={{ color: '#4caf50', cursor: 'pointer' }}
              onClick={() => this.setVerified(data.id)}
            />
          </div>
        ]
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
              <h4 className={classes.cardTitleWhite}>Tiket</h4>
              <p className={classes.cardCategoryWhite}>
                Lakukan Verifikasi Tiket
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Kode Booking', 'No Kursi', 'Total', 'Status']}
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
