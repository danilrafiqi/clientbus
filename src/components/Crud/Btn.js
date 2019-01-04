import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class AddBtn extends Component {
  render() {
    return (
      <Tooltip title="Add" onClick={this.props.handleClickOpen}>
        <IconButton aria-label="Add">
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

class UpdateBtn extends Component {
  render() {
    return (
      <Tooltip title="Update" onClick={this.props.handleClickOpen}>
        <IconButton aria-label="Update">
          <UpdateIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

class DeleteBtn extends Component {
  render() {
    return (
      <Tooltip title="Delete" onClick={this.props.handleClickOpen}>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export { AddBtn, UpdateBtn, DeleteBtn };
