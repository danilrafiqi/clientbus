import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import DateRange from '@material-ui/icons/DateRange';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';

import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import { emailsSubscriptionChart } from 'variables/charts.jsx';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      agen: 0,
      total_tiket_terjual: 0,
      total_pendapatan: 0,
      tpbb: {
        labels: [],
        series: [[]]
      },
      po_id: this.getPoId()
    };
  }

  getPoId = () => {
    const token = localStorage.getItem('drcreative');
    const tokenDecode = jwtDecode(token);
    return tokenDecode.po;
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getPendapatanByBulan = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/manager-po/total-pendapatan-by-bulan/${
          this.state.po_id
        }`
      )
      .then(res => {
        res.data.map(data => {
          this.state.tpbb.labels.push(data.bulan);
          this.state.tpbb.series[0].push(data.total);
          return true;
        });
      });
  };

  getAgen = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/manager-po/total-agen/${this.state.po_id}`
      )
      .then(res => {
        this.setState({ agen: res.data[0].total_agen });
      });
  };

  getTiketTerjual = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/manager-po/total-tiket-terjual/${
          this.state.po_id
        }`
      )
      .then(res => {
        this.setState({ total_tiket_terjual: res.data[0].total_tiket_terjual });
      });
  };
  getPendapatan = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/manager-po/total-pendapatan/${
          this.state.po_id
        }`
      )
      .then(res => {
        this.setState({ total_pendapatan: res.data[0].total_pendapatan });
      });
  };

  componentDidMount() {
    this.getAgen();
    this.getPendapatan();
    this.getTiketTerjual();
    this.getPendapatanByBulan();
  }

  render() {
    console.log('poid', this.state.po_id);
    const { classes } = this.props;
    const { agen, total_pendapatan, total_tiket_terjual } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Jumlah Agen</p>
                <h3 className={classes.cardTitle}>{agen}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Selama Ini
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Jumlah Tiket Terjual</p>
                <h3 className={classes.cardTitle}>{total_tiket_terjual}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Selama Ini
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Total Penjualan</p>
                <h3 className={classes.cardTitle}>{total_pendapatan}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Selama Ini
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              {console.log('sss', this.state.tpbb)}
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.tpbb}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Jumlah Pendapatan Berdasarkan Bulan
                </h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Selama 2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
