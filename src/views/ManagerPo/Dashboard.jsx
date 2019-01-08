import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import { bugs, website, server } from 'variables/general.jsx';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from 'variables/charts.jsx';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

import axios from 'axios';

class Dashboard extends React.Component {
  state = {
    value: 0,
    po: 0,
    total_tiket_terjual: 0,
    total_pendapatan: 0,
    tpbp_label: [],
    tpbp_value: [],
    tpbb: {
      labels: [],
      series: [[]]
    }
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getPendapatanByPo = async () => {
    axios
      .get(`${process.env.REACT_APP_API}/manager/total-pendapatan-by-po`)
      .then(res => {
        res.data.map(data => {
          this.state.tpbp_label.push(data.po_nama);
          this.state.tpbp_value.push(data.total);
        });
      });
  };

  getPendapatanByBulan = async () => {
    axios
      .get(`${process.env.REACT_APP_API}/manager/total-pendapatan-by-bulan`)
      .then(res => {
        res.data.map(data => {
          this.state.tpbb.labels.push(data.bulan);
          this.state.tpbb.series[0].push(data.total);
        });
      });
  };

  getPo = () => {
    axios.get(`${process.env.REACT_APP_API}/manager/total-po`).then(res => {
      this.setState({ po: res.data[0].total_po });
    });
  };

  getTiketTerjual = () => {
    axios
      .get(`${process.env.REACT_APP_API}/manager/total-tiket-terjual`)
      .then(res => {
        this.setState({ total_tiket_terjual: res.data[0].total_tiket_terjual });
      });
  };
  getPendapatan = () => {
    axios
      .get(`${process.env.REACT_APP_API}/manager/total-pendapatan`)
      .then(res => {
        this.setState({ total_pendapatan: res.data[0].total_pendapatan });
      });
  };

  componentDidMount() {
    this.getPo();
    this.getPendapatan();
    this.getTiketTerjual();
    this.getPendapatanByPo();
    this.getPendapatanByBulan();
  }

  render() {
    console.log('stata', this.state.total_pendapatan);
    const { classes } = this.props;
    const { po, total_pendapatan, total_tiket_terjual } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Jumlah PO</p>
                <h3 className={classes.cardTitle}>{po}</h3>
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
              <CardHeader color="success">
                {console.log('asasa', this.state.tpbp_value)}
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: this.state.tpbp_label,
                    series: [this.state.tpbp_value]
                  }}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{' '}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
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
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
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
