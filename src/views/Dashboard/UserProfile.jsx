import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import avatar from 'assets/img/ava.png';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import swal from '@sweetalert/with-react';

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

class UserProfile extends React.Component {
  state = {
    nama: '',
    jenis_kelamin: '',
    password_baru: '',
    password_lama: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getProfile = email => {
    axios
      .get(`${process.env.REACT_APP_API}/login/profile/${email}`)
      .then(res => {
        console.log('sss', res);
        if (res.data !== []) {
          this.setState({
            nama: res.data[0].nama,
            jenis_kelamin: res.data[0].jenis_kelamin
          });
        }
      });
  };

  getEmail = () => {
    const token = localStorage.getItem('drcreative');

    try {
      if (token) {
        const tokenDecode = jwtDecode(token);
        return tokenDecode.email;
      }
    } catch (e) {
      return 'notvalid';
    }
  };

  decodeToken = () => {
    const token = localStorage.getItem('drcreative');

    try {
      if (token) {
        const tokenDecode = jwtDecode(token);
        return tokenDecode;
      }
    } catch (e) {
      return 'notvalid';
    }
  };

  updateProfile = () => {
    const email = this.getEmail();
    const data = {
      nama: this.state.nama,
      jenis_kelamin: this.state.jenis_kelamin
    };

    const myData = this.decodeToken();
    let myUrl;
    if (myData.hak_akses === 'superadmin' || myData.hak_akses === 'manager') {
      myUrl = `${process.env.REACT_APP_API}/user/profile/${email}`;
    } else {
      myUrl = `${process.env.REACT_APP_API}/operator/profile/${email}`;
    }
    axios.put(myUrl, data).then(res => {
      console.log('aa', res.data);
      if (res.data.message === 'success') {
        swal(<h1>Succes update profile</h1>);
      }
    });
  };

  updatePassword = () => {
    const email = this.getEmail();
    const data = {
      password_baru: this.state.password_baru,
      password_lama: this.state.password_lama
    };
    axios
      .put(`${process.env.REACT_APP_API}/login/password/${email}`, data)
      .then(res => {
        console.log('aa', res.data);
        if (res.data.message === 'success') {
          swal(<h1>Succes update profile</h1>);
        }
      });
  };

  componentWillMount() {
    this.getProfile(this.getEmail());
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="filled-name"
                      label="Nama"
                      className={classes.textField}
                      name="nama"
                      value={this.state.nama}
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="jenis_kelamin">
                        Jenis Kelamin
                      </InputLabel>
                      <Select
                        value={this.state.jenis_kelamin}
                        onChange={this.handleChange}
                        input={
                          <Input name="jenis_kelamin" id="jenis_kelamin" />
                        }>
                        <MenuItem value="l">Laki Laki</MenuItem>
                        <MenuItem value="p">Perempuan</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={this.updateProfile} color="primary">
                  Update Profile
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Change Password</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="password_lama"
                      label="Password Lama"
                      className={classes.textField}
                      name="password_lama"
                      value={this.state.password_lama}
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      type="password"
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
                <Button onClick={this.updatePassword} color="primary">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
