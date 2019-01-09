import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import DateFnsUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import SearchWrapper from './SearchWrapper';
import { Link } from 'react-router-dom';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  labelSearch: {
    fontSize: '17px',
    fontWeight: 500
  },
  label: {
    fontSize: '14px',
    lineHeight: '24px'
  },
  searchWrapper: {
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
    background: 'white',
    boxShadow: '0 2px 4px 0 rgba(27,27,27,.2)'
  }
});

class App extends React.Component {
  state = {
    pemberangkatan: '',
    pemberhentian: '',
    options: [],
    tanggal_keberangkatan: moment(new Date()).format('YYYY-MM-DD'),
    data: []
  };

  getKabupaten = async () => {
    let suggestions = await axios.get(`http://localhost:2018/cari/kabupaten`);
    this.setState({
      options: suggestions.data.map(suggestion => ({
        value: suggestion.name,
        label: suggestion.name
      }))
    });
  };
  componentDidMount() {
    this.getKabupaten();
  }
  handleDateChange = date => {
    this.setState({ tanggal_keberangkatan: moment(date).format('YYYY-MM-DD') });
  };

  handlePemberangkatan = pemberangkatan => {
    this.setState({ pemberangkatan });
  };
  handlepemBerhentian = pemberhentian => {
    this.setState({ pemberhentian });
  };
  // http://localhost:2018/cari/jadwal?pemberhentian=Kota%20Jakarta%20Selatan&pemberangkatan=Kota%20Bandar%20Lampung&tanggal_keberangkatan=2018-12-29

  render() {
    const { tanggal_keberangkatan, pemberangkatan, pemberhentian } = this.state;
    const { classes } = this.props;

    return (
      <SearchWrapper
        pemberangkatan={
          <React.Fragment>
            <label className={classes.label} htmlFor="pemberangkatan">
              Pemberangkatan
            </label>
            <Select
              id="pemberangkatan"
              value={pemberangkatan}
              onChange={this.handlePemberangkatan}
              options={this.state.options}
              isSearchable
            />
          </React.Fragment>
        }
        pemberhentian={
          <React.Fragment>
            <label className={classes.label} htmlFor="pemberhentian">
              Pemberhentian
            </label>
            <Select
              id="pemberhentian"
              value={pemberhentian}
              onChange={this.handlepemBerhentian}
              options={this.state.options}
              isSearchable
            />
          </React.Fragment>
        }
        tanggal={
          <React.Fragment>
            <label className={classes.label} htmlFor="pemberhentian">
              Tanggal
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth
                id="date"
                value={tanggal_keberangkatan}
                minDate={new Date()}
                maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </React.Fragment>
        }
        tombol={
          <Link
            style={{ alignItems: 'center', display: 'flex' }}
            to={`/cari/jadwal?pemberhentian=${
              pemberhentian.value
            }&pemberangkatan=${
              pemberangkatan.value
            }&tanggal_keberangkatan=${tanggal_keberangkatan}`}>
            <Button fullWidth variant="contained" color="primary">
              Search
              <Search className={classes.rightIcon} />
            </Button>
          </Link>
        }
      />
    );
  }
}

export default withStyles(styles)(App);
