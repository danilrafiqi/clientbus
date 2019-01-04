import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class AlertDialog extends React.Component {
  state = {
    labelWidth: 0,
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    if (props.open === true) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.btnPopUp}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>{this.props.children}</DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            {this.props.btnSave}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

AlertDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlertDialog);
