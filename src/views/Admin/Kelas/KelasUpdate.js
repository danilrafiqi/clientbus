import React, { Component } from 'react';
import AddUpdate from 'components/Crud/AddUpdate';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { UpdateBtn } from 'components/Crud/Btn';
import tokenHelpers from 'helpers/tokenHelpers';

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
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      open: false,
      id: '',
      nama: '',
      deskripsi: '',
      po_id: this.setPo(),
      data_po: []
    };
  }

  setPo = () => {
    const user = tokenHelpers.decodeToken();
    return user.po;
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  detail = id => {
    axios.get(`${process.env.REACT_APP_API}/kelas/${id}`).then(res => {
      this.setState({
        open: true,
        nama: res.data[0].nama,
        deskripsi: res.data[0].deskripsi,
        po_id: res.data[0].po_id
      });
    });
  };
  update = id => {
    axios
      .put(`${process.env.REACT_APP_API}/kelas/${id}`, {
        nama: this.state.nama,
        deskripsi: this.state.deskripsi,
        po_id: this.state.po_id
      })
      .then(res => {
        this.setState({
          open: false,
          id: '',
          nama: '',
          deskripsi: '',
          po_id: ''
        });
        this.props.getData();
      });
  };
  getPo = () => {
    axios.get(`${process.env.REACT_APP_API}/po/`).then(res => {
      this.setState({
        data_po: res.data
      });
    });
  };

  componentWillMount() {
    this.getPo();
  }
  render() {
    const { classes } = this.props;
    const dataForm = [
      {
        title: 'Nama Kelas',
        name: 'nama',
        nilai: this.state.nama
      },
      {
        title: 'Deskripsi',
        name: 'deskripsi',
        nilai: this.state.deskripsi
      }
    ];

    return (
      <AddUpdate
        title="Update Kelas"
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
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth>
            <InputLabel htmlFor="po_id">PO</InputLabel>
            <Select
              disabled
              value={this.state.po_id}
              onChange={this.handleChange}
              input={<FilledInput name="po_id" id="po_id" />}>
              {this.state.data_po.map(datas => {
                return (
                  <MenuItem key={datas.id} value={datas.id}>
                    {datas.nama}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
      </AddUpdate>
    );
  }
}

export default withStyles(styles)(AgenAdd);
