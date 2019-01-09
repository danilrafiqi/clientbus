import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import Search from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import ButtonOri from '@material-ui/core/Button';

import axios from 'axios';
import swal from '@sweetalert/with-react';
import tokenHelpers from 'helpers/tokenHelpers';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
};

class ChangePassword extends React.Component {
  state = {
    nama: '',
    password_baru: '',
    email: '',
    email_found: 'User Not Found',
    disable: true
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchUser = () => {
    const { email } = this.state;
    const user = tokenHelpers.decodeToken();
    let loginUrl;
    if (user.po === 'null') {
      loginUrl = `${process.env.REACT_APP_API}/login/${email}`;
    } else {
      loginUrl = `${process.env.REACT_APP_API}/login/${email}/bypo/${user.po}`;
    }
    axios.get(`${loginUrl}`).then(res => {
      if (res.data.length !== 0) {
        this.setState({
          email_found: res.data[0].email,
          disable: false
        });
      } else {
        this.setState({
          email: '',
          email_found: 'User Not Found',
          password_baru: '',
          disable: true
        });
        swal(<h1>Email Tidak ditemukan</h1>);
      }
    });
  };

  updatePassword = () => {
    const data = {
      password_baru: this.state.password_baru
    };
    const { email_found } = this.state;
    axios
      .put(
        `${process.env.REACT_APP_API}/login/newpassword/${email_found}`,
        data
      )
      .then(res => {
        if (res.data.message === 'success') {
          this.setState({
            email: '',
            email_found: 'User Not Found',
            password_baru: '',
            disable: true
          });
          swal(<h1>Succes update password</h1>);
        }
      });
  };

  componentWillMount() {
    // this.getProfile(this.getEmail());
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div>
              <Input
                type="text"
                placeholder="Masukkan Email"
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
              />
              <ButtonOri onClick={this.searchUser}>
                Search <Search />
              </ButtonOri>
            </div>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Change Password</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="email_found"
                      label="User"
                      className={classes.textField}
                      name="email_found"
                      value={this.state.email_found}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="password_baru"
                      label="Password Baru"
                      className={classes.textField}
                      name="password_baru"
                      value={this.state.password_baru}
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      type="password"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={this.updatePassword}
                  disabled={this.state.disable ? true : false}
                  color="primary">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ChangePassword);
