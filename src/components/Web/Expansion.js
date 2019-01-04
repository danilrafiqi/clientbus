import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Expansion = props => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {props.summary}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{props.detail}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Expansion;
