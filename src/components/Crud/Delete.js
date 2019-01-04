import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { DeleteBtn } from './Btn';

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  delete = id => {
    axios.delete(`${this.props.api}/${id}`).then(res => {
      this.setState({
        open: false
      });
      this.props.getData();
    });
  };
  render() {
    return (
      <React.Fragment>
        <DeleteBtn handleClickOpen={this.handleClickOpen} />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{'Delete Data'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah anda yakin ingin menghapus data ini ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button
              onClick={() => this.delete(this.props.idNya)}
              color="primary"
              autoFocus>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AlertDialog;
