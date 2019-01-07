import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import swal from '@sweetalert/with-react';
// import { createBrowserHistory } from 'history';
import jwtDecode from 'jwt-decode';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  signIn = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`${process.env.REACT_APP_API}/auth/signin`, data).then(res => {
      console.log('dadada', res);
      if (res.data == 'unauthorized') {
        swal(
          <div>
            <p>username or password not valid</p>
          </div>
        );
      } else {
        localStorage.setItem('drcreative', res.data);
        const token = res.data;
        const user = jwtDecode(token);
        // console.log('aaa', res.data.hak_akses);
        switch (user.hak_akses) {
          case 'superadmin':
            this.props.history.push('/superadmin');
            break;
          case 'admin':
            this.props.history.push('/admin');
            break;
          case 'manager':
            this.props.history.push('/manager');
            break;
          case 'manager_po':
            this.props.history.push('/manager_po');
            break;
          case 'petugas':
            this.props.history.push('/petugas');
            break;
          default:
            this.props.history.push('/cannotaccess');
            break;
        }
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signIn}>
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SignIn);
