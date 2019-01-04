import React, { Component } from 'react';
import Delete from '../../../components/Crud/Delete';

class AgenDelete extends Component {
  render() {
    return (
      <Delete
        api={`${process.env.REACT_APP_API}/bank`}
        getData={this.props.getData}
        idNya={this.props.idNya}
      />
    );
  }
}

export default AgenDelete;
