import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { UpdateBtn } from 'components/Crud/Btn';
import AddUpdate from 'components/Crud/AddUpdate';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
class AgenAdd extends Component {
  state = {
    labelWidth: 0,
    open: false,
    id: '',
    kode: '',
    deskripsi: ''
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/rute/${id}`).then(res => {
      this.setState({
        open: true,
        kode: res.data[0].kode,
        deskripsi: res.data[0].deskripsi
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/rute/${id}`, {
        kode: this.state.kode,
        deskripsi: this.state.deskripsi
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          kode: '',
          deskripsi: ''
        });
        this.props.getData();
      });
  };
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Kode',
        name: 'kode',
        nilai: this.state.kode
      },
      {
        title: 'Deskripsi',
        name: 'deskripsi',
        nilai: this.state.deskripsi
      }
    ];

    return (
      <AddUpdate
        title="Update Rute"
        open={this.state.open}
        btnPopUp={
          <UpdateBtn handleClickOpen={() => this.detail(this.props.idNya)} />
        }
        btnSave={
          <Button
            onClick={() => this.update(this.props.idNya)}
            color="primary"
            autoFocus>
            Simpan
          </Button>
        }>
        <form className={classes.root} autoComplete="off">
          {dataForm.map((datas, index) => {
            return (
              <TextField
                key={index}
                id="filled-name"
                label={datas.title}
                className={classes.textField}
                name={datas.name}
                value={datas.nilai}
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                variant="filled"
              />
            );
          })}
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
